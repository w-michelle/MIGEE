import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

export const getGlobalSetting = async () => {
  const HOMEPAGE_QUERY = defineQuery(`
         *[_type == "page" && slug.current == "home"][0]{
      ...,
      seo {
        metaTitle,
        metaDesc,
        shareTitle,
        shareDesc,
        shareGraphic {
          asset->{
            _id,
            url
          }
        }
      },
   
  }
        `);

  try {
    const page = await sanityFetch({
      query: HOMEPAGE_QUERY,
    });

    return page.data;
  } catch (error) {
    console.error(`Error fetching page`, error);
  }
};
