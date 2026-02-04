import { defineQuery } from "next-sanity";
import { sanityFetchStatic } from "../sanityFetchStatic";

export const getPromoBanner = async () => {
  const ACTIVE_PROMO_BANNER = defineQuery(`
            *[_type == "promo"]{
                enabled,
                text
            }
        `);

  try {
    const banner = await sanityFetchStatic({
      query: ACTIVE_PROMO_BANNER,
    });
    return banner ? banner : null;
  } catch (error) {
    console.error("Error fetching banner", error);
    return null;
  }
};
