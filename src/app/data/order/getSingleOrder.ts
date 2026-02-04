/* eslint-disable @typescript-eslint/no-explicit-any */

import { shopifyFetch } from "@/lib/shopify";
import { getProductByID } from "@/sanity/lib/products/getProductByID";
import { cookies } from "next/headers";

export default async function getSingleOrder(orderNo: string) {
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

    const singleOrder = orders.orders.find(
      (order: any) => order.name == orderNo,
    );
    if (!singleOrder) {
      throw new Error("Order not found");
    }
    const singleOrderWithImg = {
      ...singleOrder,
      line_items: await Promise.all(
        singleOrder.line_items.map(async (line: any) => {
          const product = await getProductByID(line.product_id);

          if (!product || !product.galleryPhotos) {
            return {
              ...line,
              image: null,
            };
          }
          const variantImg = product.galleryPhotos.find(
            (img: any) => img.forOption.split(":")[1] == line.variant_title,
          );

          return {
            ...line,
            image: variantImg?.photos[0].asset._ref ?? null,
          };
        }),
      ),
    };

    return singleOrderWithImg;
  } catch (error: any) {
    throw new Error(error);
  }
}
