import Image from "next/image";
import { useRef, useState } from "react";
import {
  ProductGalleryPhotos,
  ProductVariant,
} from "../../../../../sanity.types";
import { imageUrl } from "@/lib/imageUrl";

interface ProductVisualProps {
  activeVariant: ProductVariant;
  gallery: ProductGalleryPhotos[];
}

function ProductVisuals({ activeVariant, gallery }: ProductVisualProps) {
  //get container height
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const findGallery = gallery?.find((item) => {
    if (!item.forOption) return null;
    const colorValue = item.forOption.split(":")[1];
    return colorValue === activeVariant.variantTitle;
  });

  if (!findGallery) return null;
  const photos = findGallery.photos;
  //   const photos = productphotos[0].photos;

  const handleScroll = () => {
    const elem = containerRef.current;

    if (!elem) return;
    const containerHeight = elem.clientHeight;
    const scrollTop = elem.scrollTop;

    const index = Math.round(scrollTop / containerHeight);
    setActiveIndex(index);
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="aspect-5/7 overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      >
        {photos?.map((img, index) => (
          <div
            key={index}
            className="aspect-5/7 relative snap-start"
          >
            {img.asset ? (
              <Image
                src={imageUrl(img.asset._ref).url()}
                alt={img.alt || ""}
                fill
                className="object-cover"
              />
            ) : null}
          </div>
        ))}
      </div>
      {/* scroll indicator */}
      <div className="absolute bottom-10 right-[-20] flex flex-col gap-4">
        {photos?.map((_, i) => (
          <div
            key={i}
            className={`h-1 w-1 rounded-full transition-all ${activeIndex === i ? "bg-black" : "bg-neutral-400"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
export default ProductVisuals;
