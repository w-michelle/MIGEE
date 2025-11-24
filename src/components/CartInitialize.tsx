"use client";
import { useCartStore } from "@/store/cartStore";
import useSWR from "swr";

export default function CartInitialize({ cartId }: { cartId: string | null }) {
  const setCartId = useCartStore((s) => s.setCartId);

  //set the cartId from cookie on first render
  if (cartId) setCartId(cartId);

  //if no cart in cookie, fetch will trigger the route handler to create one

  useSWR("/api/cart/init", (url) => fetch(url).then((res) => res.json()), {
    onSuccess: (cart) => setCartId(cart.id),
    revalidateOnFocus: false,
  });

  return null;
}
