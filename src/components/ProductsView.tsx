import { Category, Product } from "../../sanity.types";
import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className="w-full border-pink-200">
      {/* categories */}
      <div className="w-full ">
        {/* <CategorySelectorComponent categories /> */}
      </div>
      {/* products */}
      <div className="flex-1 w-full">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default ProductsView;
