import { ProductWithVariants } from "@/components/ProductThumb";

export function generateProductSchema(product: ProductWithVariants) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.productImage,
    description: product.shopifyDescription,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "MIGEE",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "CAD",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://migee.co/product/${product.slug?.current}`,
    },
  };
}
