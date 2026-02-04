/* eslint-disable @typescript-eslint/no-explicit-any */
import { getShopifyCart } from "@/app/data/mutations/cart/cart";
import { NextResponse } from "next/server";

export async function GET(
  req: any,
  { params }: { params: Promise<{ cartId: string }> },
) {
  const { cartId } = await params;
  const decodedCartId = decodeURIComponent(cartId);

  const cart = await getShopifyCart(decodedCartId);

  return NextResponse.json(cart);
}
