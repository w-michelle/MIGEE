import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getPromoBanner = async () => {
  const ACTIVE_PROMO_BANNER = defineQuery(`
            *[_type == "promo"][0]{
                enabled,
                text
            }
        `);

  try {
    const banner = await sanityFetch({
      query: ACTIVE_PROMO_BANNER,
    });
    return banner ? banner.data : null;
  } catch (error) {
    console.error("Error fetching banner", error);
    return null;
  }
};
