import { getPromoBanner } from "@/sanity/lib/banner/getPromoBanner";
import { div } from "motion/react-client";

async function Banner() {
  const promo = await getPromoBanner();

  if (!promo?.enabled) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-2 rounded-lg shadow-lg">
      {promo.text}
    </div>
  );
}

export default Banner;
