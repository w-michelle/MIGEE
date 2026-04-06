"use client";
import { useCartStore } from "@/store/cartStore";
import useSWR from "swr";

export default function CartInitialize() {
  const setCartId = useCartStore((s) => s.setCartId);

  //if no cart in cookie, fetch will trigger the route handler to create one

  useSWR(["/api/cart/init"], ([url]) => fetch(url).then((res) => res.json()), {
    onSuccess: (cart) => setCartId(cart.id),
    revalidateOnFocus: false,
  });

  return null;
}
