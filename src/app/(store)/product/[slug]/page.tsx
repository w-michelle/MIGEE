/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPrice } from "@/lib/formatPrice";
import { imageUrl } from "@/lib/imageUrl";
import { stripHtml } from "@/lib/stripHtml";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import { IoBagOutline } from "react-icons/io5";
import Image from "next/image";

import { notFound } from "next/navigation";
import Link from "next/link";

interface ProductPageProps {
  variant?: string;
  slug: string;
}
async function ProductPage({
  searchParams,
  params,
}: {
  searchParams: { variant?: string };
  params: { slug: string };
}) {
  const { slug } = await params;
  const variantId = await searchParams.variant;
  const product = await getProductBySlug(slug);
  console.log("product", product);

  if (!product) {
    return notFound();
  }

  console.log("product variant from prod", product.variants[0].options);

  const activeVariant =
    product.variants.find((val) => val.id === variantId) ?? product.variants[0];

  const selected = product?.optionSettingsResolved;
  console.log("selected color", selected);
  const isOutOfStock = !product.inStock;
  // "grid grid-cols-1 md:grid-cols-2 gap-8"
  return (
    <div className="w-full mx-auto py-8 text-neutral-700 border border-amber-400">
      <div className="grid grid-cols-1 md:grid-cols-[58%_40%]">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}
        >
          {product.productImage && (
            <Image
              src={product.productImage}
              alt={product.productTitle || "Product image"}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="flex flex-col p-20 ">
          <div>
            <h1 className="text-md font-bold mb-4">{product.productTitle}</h1>
            <div>
              {/* add state to show selected color */}
              <div>Red</div>
              {product.optionSettingsResolved &&
                product.optionSettingsResolved.map((variant: any, index) => (
                  <li key={index}>
                    <Link href="/">
                      <div
                        className={`w-5 h-5 bg-[${variant.color.hex}]`}
                      ></div>
                    </Link>
                  </li>
                ))}
            </div>
            <button className="w-full tracking-widest text-xs py-4 px-6 mb-4 bg-neutral-800 text-white flex items-center justify-between">
              <span className="flex items-center gap-3">
                <IoBagOutline /> ADD TO CART
              </span>
              <span>{formatPrice(product.price!)} CAD</span>
            </button>
            {/* <div className="prose max-w-none">
              {stripHtml(product.shopifyDescription)}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
