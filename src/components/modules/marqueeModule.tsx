/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
const MarqueeModule = ({ data }: { data: any }) => {
  return (
    <section className="w-full overflow-hidden my-1">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {data.items.map((item: any) => (
          <Link
            key={item._key}
            href={`/product/${item.slug}?variant=${item.defaultVariant.variantID}`}
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={item.productImage}
                alt={item.productTitle}
                fill
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MarqueeModule;
