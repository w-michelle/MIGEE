import { getPromoBanner } from "@/sanity/lib/banner/getPromoBanner";
import { div } from "motion/react-client";

async function Banner() {
  const promo = await getPromoBanner();

  if (!promo?.enabled) {
    return null;
  }

  return (
    <div className="bg-black text-xs text-center text-white px-6 py-0.5 shadow-lg">
      {promo.text}
    </div>
  );
}

export default Banner;
