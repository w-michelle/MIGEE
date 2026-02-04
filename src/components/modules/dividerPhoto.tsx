import Image from "next/image";

/* eslint-disable @typescript-eslint/no-explicit-any */
const DividerPhoto = ({ data }: { data: any }) => {
  return (
    <div className="w-full">
      <div className="flex items-center flex-1">
        {data.media.map((item: any) => {
          if (item.mediaType == "video") {
            return (
              <div
                key={item._key}
                className="relative aspect-square flex-1"
              >
                <video
                  src={item.video.asset.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            );
          } else {
            return (
              <div
                key={item._key}
                className="relative aspect-square w-full flex-1"
              >
                <Image
                  src={item.image.asset.url}
                  alt={item.image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default DividerPhoto;
