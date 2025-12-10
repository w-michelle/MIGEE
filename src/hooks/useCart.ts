import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCart(cartId: string | null) {
  return useSWR(
    cartId ? `/api/cart/${encodeURIComponent(cartId)}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );
}
