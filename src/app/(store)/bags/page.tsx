import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

async function Page() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  console.log("all products with variants:", products);
  return (
    <div className=" min-h-screen w-full">
      <ProductsView
        products={products}
        categories={categories}
      />
    </div>
  );
}

export default Page;
