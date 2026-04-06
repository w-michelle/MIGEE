import { customerAccessToken, user } from "./../../../../db/schema";
import {
  createShopifyCart,
  getShopifyCart,
} from "@/app/data/mutations/cart/cart";
import { db } from "@/db";
import { shopifyFetch } from "@/lib/shopify";
import { eq, isNotNull } from "drizzle-orm";
import { cookies } from "next/headers";

export const UPDATE_CART_BUYER = `
  mutation cartBuyerIdentityUpdate($cartId: ID! $buyerIdentity: CartBuyerIdentityInput!) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        id
        buyerIdentity {
          customer {
            id
          }
          email
        }
      }
        userErrors {
          fields
          message
        }
          warnings {
            code
            message    
      }
    }
  }
`;

export async function GET() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value ?? null;

  // console.log("current cart id is:", cartId);

  //case 1- existing cartId try to fetch it
  if (cartId) {
    const cart = await getShopifyCart(cartId);
    // console.log("cart case 1 get shopify", cart);
    if (cart) {
      return Response.json(cart);
    } else {
      //no cart or its invalid so delete it from cookie first
      cookieStore.delete("cartId");
      //cartid is invalid = create new cart
      const newCart = await createShopifyCart();

      //check if a user is logged in via customeraccesstoken'
      //check if user has cartid in database because they should have one when they login,
      //  so if they dont that means they paid and cart was removed thru webhook
      //so there is a user and the user doesnt have cartid - cartbuyeridentityupdate

      const accessToken = cookieStore.get("customerAccessToken")?.value ?? null;
      //If cat exists check if customer exist in db and if they have cartId, if not, update buyer's identity
      if (accessToken) {
        const dbCustomer = await db
          .select()
          .from(user)
          .where(eq(user.customerAccessToken, accessToken))
          .limit(1);

        console.log("dbCustomer", dbCustomer);
        if (dbCustomer.length !== 0) {
          const result = await shopifyFetch(UPDATE_CART_BUYER, {
            cartId: newCart.id,
            buyerIdentity: {
              customerAccessToken: accessToken,
            },
          });

          const payload = result?.data?.cartBuyerIdentityUpdate;
          const errors = payload?.userErrors ?? [];

          //if theres no errors, update db with new cartId
          if (errors.length === 0) {
            await db
              .update(user)
              .set({ cartId: newCart.id })
              .where(eq(user.id, dbCustomer[0].id));
          }
        }
      }

      //set new cart to cookie
      // console.log("case1b create new cart", newCart);
      cookieStore.set("cartId", newCart.id, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      return Response.json(newCart);
    }
  } else {
    //case 2- guest account and no cartId = create new cart

    const newCart = await createShopifyCart();
    cookieStore.set("cartId", newCart.id, { path: "/" });
    // console.log("case2", newCart);

    return Response.json(newCart);
  }
}
