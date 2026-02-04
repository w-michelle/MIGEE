"use client";
import { useCartStore } from "@/store/cartStore";
import useSWR from "swr";
import Cookies from "js-cookie";

export default function CartInitialize() {
  const setCartId = useCartStore((s) => s.setCartId);

  const cartId = Cookies.get("cartId") ?? null;

  //if no cart in cookie, fetch will trigger the route handler to create one

  useSWR(
    ["/api/cart/init", cartId],
    ([url]) => fetch(url).then((res) => res.json()),
    {
      onSuccess: (cart) => setCartId(cart.id),
      revalidateOnFocus: false,
    },
  );

  return null;
}
