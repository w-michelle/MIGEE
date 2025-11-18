import { AnimatePresence } from "motion/react";
import { Product } from "../../sanity.types";
import * as motion from "motion/react-client";
import ProductThumb from "./ProductThumb";
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {products?.map((product) => (
        <AnimatePresence key={product._id}>
          <motion.div
            layout
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <ProductThumb product={product} />
          </motion.div>
        </AnimatePresence>
      ))}
      product grid
    </div>
  );
}

export default ProductGrid;
