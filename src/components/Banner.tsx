import { getPromoBanner } from "@/sanity/lib/banner/getPromoBanner";
import { div } from "motion/react-client";

async function Banner() {
  const promo = await getPromoBanner();

  if (!promo?.enabled) {
    return null;
  }

  return (
    <div className="bg-black text-sm text-center text-white px-6 py-1 shadow-lg">
      {promo.text}
    </div>
  );
}

export default Banner;
