import { getPromoBanner } from "@/sanity/lib/banner/getPromoBanner";
import { BannerClient } from "./BannerClient";

async function Banner() {
  const promo = await getPromoBanner();

  return <BannerClient promo={promo} />;
}

export default Banner;
