/* eslint-disable @typescript-eslint/no-explicit-any */
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";

const Hero = ({ data }: { data: any }) => {
  return (
    <section className="w-full flex">
      {data.photos.map((photo: any) => (
        <div
          key={photo._key}
          className="relative aspect-[5/7] w-full h-full"
        >
          {photo.asset ? (
            <Image
              src={imageUrl(photo.asset._id).url()}
              alt="Charms"
              fill
              className="object-cover"
            />
          ) : (
            ""
          )}
        </div>
      ))}
    </section>
  );
};
export default Hero;
