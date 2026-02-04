/* eslint-disable @typescript-eslint/no-explicit-any */

import { shopifyFetch } from "@/lib/shopify";
import { cookies } from "next/headers";

export default async function getCustomerOrders() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("customerAccessToken")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ORDER_QUERY = `
        query getCustomer($token: String!) {
            customer(customerAccessToken: $token) {
                id
            }
        }
    `;

    const customerRes = await shopifyFetch(ORDER_QUERY, { token });

    const customerId = customerRes.data.customer.id.split("/").pop();

    const adminToken = process.env.SHOPIFY_ADMIN_API_TOKEN;
    if (!adminToken) {
      throw new Error("Missing admin");
    }

    const orderRes = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID}.myshopify.com/admin/api/2025-10/orders.json?customer_id=${customerId}&status=any`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": adminToken,
        },
        cache: "no-store",
      },
    );

    if (!orderRes.ok) {
      throw new Error("Failed to fetch orders");
    }
    const orders = await orderRes.json();
    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
