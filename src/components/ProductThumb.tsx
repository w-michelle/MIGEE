import Link from "next/link";
import { Color, Product, ProductVariant } from "../../sanity.types";
import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";

export type ProductWithVariants = Product & {
  variants: ProductVariant[];
  optionSettingsResolved?: Array<{
    color: Color | null;
    forOption: string | null;
  }> | null;
};

function ProductThumb({ product }: { product: ProductWithVariants }) {
  const isOutOfStock = !product.inStock;

  console.log("product variant from thumb", product.variants);

  const url =
    product.variants.length > 0
      ? `/product/${product.slug?.current}?variant=${product.variants[0].variantID}`
      : `/product/${product.slug?.current}`;

  return (
    <div className="w-full">
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
        <div className="p-4 border ">
          <h2 className="text-sm text-gray-800 truncate">
            {product.productTitle}
          </h2>
          <p className="mt-2 text-sm text-neutral-400 ">
            {formatPrice(product.price!)}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ProductThumb;
