/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { Color, Product, ProductVariant } from "../../sanity.types";
import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";
import { useState } from "react";

export type ProductWithVariants = Product & {
  variants: ProductVariant[];
  optionSettingsResolved?: Array<{
    color: Color | null;
    forOption: string | null;
  }> | null;
};

function ProductThumb({ product }: { product: ProductWithVariants }) {
  const { variants, optionSettingsResolved } = product;

  const [hovered, setHovered] = useState(false);

  const isOutOfStock = !product.inStock;

  const url =
    product.variants?.length > 0
      ? `/product/${product.slug?.current}?variant=${product.variants[0].variantID}`
      : `/product/${product.slug?.current}`;

  return (
    <article className="w-full">
      <Link
        href={url}
        className={`group w-full flex flex-col bg-white hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStock ? "opacity-50" : ""}`}
      >
        <div className="relative aspect-square  overflow-hidden">
          {product.productImage && (
            <Image
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              src={product.productImage}
              alt={product.productTitle || "Product image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <h2 className="text-xs text-gray-800 truncate">
            {product.productTitle}
          </h2>
          <p className="mt-2 text-xs text-neutral-400 ">
            {formatPrice(product.price!)} CAD
          </p>
        </div>
      </Link>
      <div
        className="px-3"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {!hovered ? (
          <span className="text-xs cursor-pointer text-neutral-500 hover:text-gray-400">
            {variants.length > 1 ? `${variants.length} colors` : ""}
          </span>
        ) : (
          <ul className="flex items-center gap-2">
            {variants &&
              variants.map((item, key) => {
                const optColor = optionSettingsResolved?.find((settings) => {
                  if (!settings.forOption) return null;
                  const optColorValue = settings.forOption.split(":")[1];
                  return optColorValue === item.variantTitle;
                });
                if (!optColor?.color?.hex) return null;
                return (
                  <li
                    key={key}
                    className={`rounded-full`}
                  >
                    <div className="py-1 relative">
                      <div
                        className="relative w-3 h-3 rounded-full"
                        style={{ backgroundColor: optColor.color.hex }}
                      ></div>
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </article>
  );
}

export default ProductThumb;
