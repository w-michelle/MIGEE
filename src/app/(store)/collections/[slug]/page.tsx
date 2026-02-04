import ProductsView from "@/components/ProductsView";

import { getCollection } from "@/sanity/lib/products/getAllProducts";

interface PageProps {
  params: {
    slug: string;
  };
}

async function Page({ params }: PageProps) {
  const { slug } = await params;

  const res = await getCollection(slug);

  if (!res || Array.isArray(res)) {
    return null;
  }
  const products = res.products ?? [];

  return (
    <main className=" min-h-screen w-full my-8">
      <ProductsView products={products} />
    </main>
  );
}

export default Page;
