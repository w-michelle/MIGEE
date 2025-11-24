/* eslint-disable @typescript-eslint/no-unused-vars */
import { shopifyFetch } from "@/lib/shopify";
import { revalidatePath } from "next/cache";
import {
  ADD_TO_CART_MUTATION,
  CART_QUERY,
  CREATE_CART_MUTATION,
  REMOVE_CART_LINE,
  UPDATE_CART_LINES_MUTATIONS,
} from "./queries";

type CartProps = {
  cartId: string;
  merchandiseId: string;
  lineId?: string;
  quantity?: number;
};

export async function getShopifyCart(cartId: string) {
  try {
    const data = await shopifyFetch(CART_QUERY, { cartId });
    return data.cart;
  } catch (error) {
    return null;
  }
}

export async function createShopifyCart() {
  const data = await shopifyFetch(CREATE_CART_MUTATION);
  console.log("cart created:", data);
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
