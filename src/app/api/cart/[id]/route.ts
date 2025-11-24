/* eslint-disable @typescript-eslint/no-explicit-any */
import { getShopifyCart } from "@/app/data/mutations/cart/cart";
import { NextResponse } from "next/server";

export async function GET(
  req: any,
  { params }: { params: { cartId: string } },
) {
  const cart = await getShopifyCart(params.cartId);
  return NextResponse.json(cart);
}
