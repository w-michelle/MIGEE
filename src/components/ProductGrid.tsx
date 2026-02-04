import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import ProductThumb, { ProductWithVariants } from "./ProductThumb";
function ProductGrid({ products }: { products: ProductWithVariants[] }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
      <AnimatePresence>
        {products?.map((product) => (
          <motion.li
            key={product._id}
            layout
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <ProductThumb product={product} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default ProductGrid;
