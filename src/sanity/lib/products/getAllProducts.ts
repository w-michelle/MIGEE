import { sanityFetchStatic } from "@/sanity/lib/sanityFetchStatic";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProductSlug = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(
    `*[_type == "product" && !wasDeleted && defined(slug.current)] {
        "slug": slug.current
    }`,
  );

  try {
    const products = await sanityFetchStatic({
      query: ALL_PRODUCTS_QUERY,
    });

    return products || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};

export const getCollection = async (slug: string) => {
  const NEW_COLLECTION_QUERY = defineQuery(
    `*[_type == "collection" && slug.current == $slug][0] {
        title,
        "slug": slug.current,
        "products": products[]->{
          ...,
          optionSettings,
          "optionSettingsResolved": optionSettings[]{
            forOption,
            "color": color->color
          },
          "variants": *[_type == "productVariant" && string(productID) == string(^.productID)  && wasDeleted != true ] {
        ...,
         }
        }
    }`,
  );

  try {
    const newCollection = await sanityFetch({
      query: NEW_COLLECTION_QUERY,
      params: { slug },
    });

    return newCollection.data || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};
