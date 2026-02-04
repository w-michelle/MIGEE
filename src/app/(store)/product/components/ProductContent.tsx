"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRouter, useSearchParams } from "next/navigation";
import ProductOption from "@/components/ProductOption";
import { ProductWithVariants } from "@/components/ProductThumb";
import ProductVisuals from "./ProductVisuals";
import ProductAction from "./ProductAction";
import { useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { IoAdd } from "react-icons/io5";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import axios from "axios";
import useSWR from "swr";

function ProductContent({ product }: { product: ProductWithVariants }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const variantId = searchParams.get("variant");

  const [isOpen, setIsOpen] = useState(false);

  const fetchInventory = (url: string, id: number) =>
    axios.get(url, { params: { id } }).then((res) => res.data);

  const activeVariant =
    product.variants.find((val) => val.variantID?.toString() === variantId) ??
    product.variants[0];

  const { data, error } = useSWR(
    product.productID
      ? [`/api/shopify/product-inventory`, product.productID]
      : null,
    ([url, id]) => fetchInventory(url, id),
  );

  //url changes -> nextjs triggers re-render, useSearchParams pickup new param aka variantID
  const updateVariant = (id: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", id);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full mx-auto py-8 text-neutral-700">
      <div className="grid grid-cols-1 md:grid-cols-[58%_40%]">
        {/* media */}
        <section>
          <ProductVisuals
            activeVariant={activeVariant}
            gallery={product.galleryPhotos || []}
          />
        </section>

        <div className="flex flex-col p-20 gap-8">
          <div className="">
            <h1 className="text-lg font-semibold mb-4">
              {product.productTitle}
            </h1>
            {/* {isOutOfStock && (
              <div className="w-[100px] h-[40px] flex items-center justify-center bg-black bg-opacity-50">
                <span className="text-white font-bold text-xs">
                  Out of Stock
                </span>
              </div>
            )} */}
          </div>

          {/* variants */}
          <section>
            <p className="text-sm">{activeVariant.title}</p>

            <div className="my-4">
              {data && (
                <ProductOption
                  variants={product.variants}
                  inventory={data.variants}
                  optionSettings={product.optionSettingsResolved}
                  activeVariant={activeVariant}
                  onChangeVariant={updateVariant}
                />
              )}
            </div>
          </section>

          {/* purchase actions */}
          <section>
            {data && (
              <ProductAction
                price={product.price!}
                productID={activeVariant.variantID!}
                inventory={data.variants}
              />
            )}
          </section>

          {/* details */}
          <section className=" text-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm text-neutral-600">Details</h3>
              {isOpen ? (
                <motion.div
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer"
                >
                  <HiOutlineMinusSmall size={14} />
                </motion.div>
              ) : (
                <motion.div
                  onClick={() => setIsOpen(true)}
                  className="cursor-pointer"
                >
                  <IoAdd size={14} />
                </motion.div>
              )}
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="prose max-w-none">
                    {/* {stripHtml(product.shopifyDescription ?? "")} */}
                    <div
                      className="text-xs overflow-y-auto"
                      dangerouslySetInnerHTML={{
                        __html: product.shopifyDescription ?? "",
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProductContent;
