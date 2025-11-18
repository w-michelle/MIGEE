/* eslint-disable @typescript-eslint/no-explicit-any */
const SHOPIFY_STOREFRONT_API_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID}.myshopify.com/api/2025-10/graphql.json`;

export async function shopifyFetch(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token":
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await response.json();
  return json;
}
