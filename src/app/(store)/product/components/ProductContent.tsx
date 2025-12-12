"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPrice } from "@/lib/formatPrice";

import { IoBagOutline } from "react-icons/io5";

import { useRouter, useSearchParams } from "next/navigation";

import ProductOption from "@/components/ProductOption";

import { ProductWithVariants } from "@/components/ProductThumb";

import ProductVisuals from "./ProductVisuals";
import { stripHtml } from "@/lib/stripHtml";

function ProductContent({ product }: { product: ProductWithVariants }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const variantId = searchParams.get("variant");
  console.log("what is search params", variantId);

  const activeVariant =
    product.variants.find((val) => val.variantID?.toString() === variantId) ??
    product.variants[0];

  //url changes -> nextjs triggers re-render, useSearchParams pickup new param aka variantID
  const updateVariant = (id: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", id);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const isOutOfStock = !product.inStock;

  return (
    <div className="w-full mx-auto py-8 text-neutral-700 border border-amber-400">
      <div className="grid grid-cols-1 md:grid-cols-[58%_40%]">
        <ProductVisuals
          activeVariant={activeVariant}
          gallery={product.galleryPhotos || []}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}

        <div className="flex flex-col p-20 gap-8">
          <h1 className="text-lg font-semibold mb-4">{product.productTitle}</h1>
          <div>
            <p className="text-sm">{activeVariant.title}</p>
            {/* Color Variants */}
            <div className="my-4">
              <ProductOption
                variants={product.variants}
                optionSettings={product.optionSettingsResolved}
                activeVariant={activeVariant}
                onChangeVariant={updateVariant}
              />
            </div>
          </div>
          <button className="w-full tracking-widest text-xs py-4 px-6 mb-4 bg-neutral-800 text-white flex items-center justify-between">
            <span className="flex items-center gap-3">
              <IoBagOutline /> ADD TO CART
            </span>
            <span>{formatPrice(product.price!)} CAD</span>
          </button>
          <div className="prose max-w-none">
            {/* {stripHtml(product.shopifyDescription ?? "")} */}
            <div
              className="text-xs"
              dangerouslySetInnerHTML={{ __html: product.shopifyDescription }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductContent;
