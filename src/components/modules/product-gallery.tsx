import Image from "next/image";

const ProductGallery = () => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-0.5 w-full m-0.5">
      <div className="relative aspect-square w-full">
        <Image
          src="/charmsplace.avif"
          alt="Charms"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative aspect-square w-full">
        <Image
          src="/charmsplace.avif"
          alt="Charms"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative aspect-square w-full">
        <Image
          src="/charmsplace.avif"
          alt="Charms"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative aspect-square w-full">
        <Image
          src="/charmsplace.avif"
          alt="Charms"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default ProductGallery;
