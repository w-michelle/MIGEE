/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { Product, ProductVariant } from "../../../../../sanity.types";
import { ProductWithVariants } from "@/components/ProductThumb";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    const hasShopify =
      process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID &&
      process.env.SHOPIFY_ADMIN_API_TOKEN;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 },
      );
    }

    if (!hasShopify) {
      return NextResponse.json(
        { error: "Shopify API not setup" },
        { status: 400 },
      );
    }

    const shopifyConfig = {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_TOKEN,
    };

    //fetch product from Shopify
    let shopifyProduct;

    try {
      const response = await axios.get<any>(
        `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID}.myshopify.com/admin/api/2025-10/products/${id}.json`,
        { headers: shopifyConfig },
      );

      shopifyProduct = response.data?.product;
    } catch (error) {
      return NextResponse.json({ error: "Product not found" });
    }

    if (!shopifyProduct || !shopifyProduct.variants) {
      return NextResponse.json({ error: "Product not found" });
    }

    //reorganize the variants so that it includes the number of instock and return it as an array to use inside product option
    //each variant show low stock / outofstock next to variant color name
    const variants = shopifyProduct.variants;

    const product = {
      inStock: variants.some((v: any) => v.inventory_quantity > 0),
      lowStock:
        variants.reduce(
          (acc: number, curr: any) => acc + curr.inventory_quantity,
          0,
        ) <= 10,
      variants: variants.map((v: any) => ({
        id: v.id,
        inStock: v.inventory_quantity > 0,
        lowStock: v.inventory_quantity,
        outOfStock: v.inventory_quantity <= 0,
      })),
    };

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
