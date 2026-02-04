import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getProductByID(productID: string) {
  const query =
    defineQuery(`*[_type == "product" && productID == $productID && wasDeleted != true][0]{
     ...,
     "variants": *[_type == "productVariant" && string(productID) == string(^.productID) && wasDeleted != true ] {
        ...,
      },
   
    }`);

  const result = await sanityFetch({ query, params: { productID } });

  return result.data || null;
}
