/* eslint-disable @typescript-eslint/no-explicit-any */

import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";

import { notFound } from "next/navigation";

import ProductContent from "../components/ProductContent";

async function ProductPage({
  searchParams,
  params,
}: {
  searchParams: { variant?: string };
  params: { slug: string };
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  console.log("product", product);

  if (!product) {
    return notFound();
  }

  return <ProductContent product={product} />;
}

export default ProductPage;
