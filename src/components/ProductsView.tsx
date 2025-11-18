import { Category, Product } from "../../sanity.types";
import ProductGrid from "./ProductGrid";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div>
      {/* categories */}
      <div className="w-full sm:w-[200px]">
        {/* <CategorySelectorComponent categories /> */}
      </div>
      {/* products */}
      <div className="flex-1">
        <ProductGrid products={products} />
        <hr className="w-1/2 sm:3/4" />
      </div>
      <div>Products View</div>
    </div>
  );
};

export default ProductsView;
