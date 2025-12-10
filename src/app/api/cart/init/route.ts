import {
  createShopifyCart,
  getShopifyCart,
} from "@/app/data/mutations/cart/cart";
import { cookies } from "next/headers";

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
      //cartid is invalid = create new cart
      const newCart = await createShopifyCart();
      // console.log("case1b create new cart", newCart);
      cookieStore.set("cartId", newCart.id, { path: "/" });

      return Response.json(newCart);
    }
  } else {
    //case 2- no cartId = create new cart

    const newCart = await createShopifyCart();
    cookieStore.set("cartId", newCart.id, { path: "/" });
    // console.log("case2", newCart);

    return Response.json(newCart);
  }
}
