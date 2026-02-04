/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "./client";

export async function sanityFetchStatic({
  query,
  params,
}: {
  query: string;
  params?: Record<string, any>;
}) {
  return client.fetch(query, params, {
    next: { revalidate: 300 },
  });
}
