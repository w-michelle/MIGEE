import Image from "next/image";

const Hero = () => {
  return (
    <section className="w-full flex">
      <div className="relative aspect-square w-full h-full">
        <Image
          src="/charmsplace.avif"
          alt="Charms"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative aspect-square w-full h-fulll">
        <Image
          src="/greenplace.avif"
          alt="Charms"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};
export default Hero;
