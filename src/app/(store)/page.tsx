import Hero from "@/components/modules/hero";
import ProductGallery from "@/components/modules/product-gallery";

export default async function Home() {
  return (
    <div className="">
      <Hero />
      <ProductGallery />
    </div>
  );
}
