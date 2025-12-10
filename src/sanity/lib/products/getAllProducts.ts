import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(
    `*[_type == "product" && !wasDeleted] | order(productTitle asc) {
      ...,
      optionSettings,
      "optionSettingsResolved": optionSettings[]{
        forOption,
        "color": color->color
      },
     "variants": *[_type == "productVariant" && string(productID) == string(^.productID) ] {
        ...,
      }
    }`,
  );

  try {
    const products = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    });

    return products.data || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};
