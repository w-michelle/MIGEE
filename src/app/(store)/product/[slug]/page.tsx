/* eslint-disable @typescript-eslint/no-explicit-any */

import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";

import { notFound } from "next/navigation";

import ProductContent from "../components/ProductContent";
import { Metadata } from "next";
import { imageUrl } from "@/lib/imageUrl";
import { toPlainText } from "next-sanity";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return {};

  const seo = product.seo;

  const ogImage = seo?.shareGraphic
    ? imageUrl(seo.shareGraphic).width(1200).height(630).url()
    : undefined;

  const description =
    seo?.metaDesc ??
    (product.description
      ? toPlainText(product.description).slice(0, 160)
      : undefined);

  const shareDescription =
    seo?.shareDesc ??
    (product.description
      ? toPlainText(product.description).slice(0, 160)
      : undefined);

  return {
    title: seo?.metaTitle || product.title,
    description,
    alternates: {
      canonical: `/products/${product.slug?.current}`,
    },
    openGraph: {
      title: seo?.shareTitle || product.title,
      description: shareDescription,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      title: seo?.shareTitle || product.title,
      description: shareDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return <ProductContent product={product} />;
}

export default ProductPage;
