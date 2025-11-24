import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useCart(cartId: string | null) {
  return useSWR(cartId ? `/api/cart/${cartId}` : null, fetcher, {
    refreshInterval: 1000,
    revalidateOnFocus: true,
  });
}
