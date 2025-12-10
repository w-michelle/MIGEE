/* eslint-disable @typescript-eslint/no-unused-vars */
import { shopifyFetch } from "@/lib/shopify";
import { revalidatePath } from "next/cache";
import {
  ADD_TO_CART_MUTATION,
  CART_BUYER_IDENTITY_UPDATE,
  CART_QUERY,
  CREATE_CART_MUTATION,
  REMOVE_CART_LINE,
  UPDATE_CART_LINES_MUTATIONS,
} from "./queries";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

type CartProps = {
  cartId: string;
  merchandiseId: string;
  lineId?: string;
  quantity?: number;
};

export async function getShopifyCart(cartId: string) {
  try {
    console.log("getshopify cart ID", cartId);
    const data = await shopifyFetch(CART_QUERY, { cartId });
    console.log("is data found in getshopify cart", data);
    return data.data.cart;
  } catch (error) {
    return null;
  }
}

export async function getCustomerCart(email: string) {
  //change it to query from DB

  const data = await db.select().from(user).where(eq(user.email, email));
  console.log("returned from db", data);
  return data;
}

export async function createShopifyCart() {
  const data = await shopifyFetch(CREATE_CART_MUTATION);
  console.log("cart created:", data.data.cartCreate.cart);
  return data.data.cartCreate.cart;
}

export async function addToCart({
  cartId,
  merchandiseId,
  quantity = 1,
}: CartProps) {
  return shopifyFetch(ADD_TO_CART_MUTATION, {
    cartId,
    lines: [{ merchandiseId, quantity }],
  });
}

export async function updateCartLine({ cartId, lineId, quantity }: CartProps) {
  return shopifyFetch(UPDATE_CART_LINES_MUTATIONS, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
}

export async function removeCartLine({ cartId, lineId }: CartProps) {
  return shopifyFetch(REMOVE_CART_LINE, {
    cartId,
    lineIds: [lineId],
  });
}

export async function attachCartToCustomer(
  cartId: string,
  customerAccessToken: string,
) {
  const res = await shopifyFetch(CART_BUYER_IDENTITY_UPDATE, {
    cartId,
    buyerIdentity: {
      customerAccessToken,
    },
  });

  console.log("attachCartToCustomer raw:", JSON.stringify(res, null, 2));

  const update = res?.data?.cartBuyerIdentityUpdate;
  if (update?.userErrors?.length) {
    console.error("Cart attach errors:", update.userErrors);
    return null;
  }
  return update?.cart ?? null;
}
