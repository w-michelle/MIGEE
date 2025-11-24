import {
  createShopifyCart,
  getShopifyCart,
} from "@/app/data/mutations/cart/cart";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value ?? null;

  let cart = null;

  if (cartId) {
    cart = await getShopifyCart(cartId);

    if (!cart) {
      const newCart = await createShopifyCart();
      cookieStore.set("cartId", newCart.id, { path: "/" });
      return Response.json(newCart);
    }
    return Response.json(cart);
  }
  const newCart = await createShopifyCart();
  cookieStore.set("cartId", newCart.id, { path: "/" });
  return Response.json(newCart);
}
