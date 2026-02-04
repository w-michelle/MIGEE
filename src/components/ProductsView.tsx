import ProductGrid from "./ProductGrid";
import { ProductWithVariants } from "./ProductThumb";

interface ProductsViewProps {
  products: ProductWithVariants[];
}

const ProductsView = ({ products }: ProductsViewProps) => {
  return (
    <div className="flex-1 w-full border-pink-200">
      {/* products */}

      <ProductGrid products={products} />
    </div>
  );
};

export default ProductsView;
