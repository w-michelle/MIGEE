/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";
import { createClient } from "next-sanity";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export default async function POST(request: Request) {
  //   try {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  const response = await request.json();
  console.log("product-images RESPONSE", response);
  // const { productID, cartPhotos } = await request.json();
}

//     //bail if no productID or Cart photos added
//     if (!productID || !cartPhotos?.length) {
//       return NextResponse.json(
//         {
//           error:
//             "Must be a POST request with a Product ID that contaisn Cart Thumbnails",
//         },
//         {
//           status: 400,
//           headers,
//         },
//       );
//     }

//     /**
//      * Fetch Product Data from Sanity
//      */
//     // cartPhotos[] {
//     //         forOption,
//     //         "default": cartPhoto{ ${queries.imageMeta}}
//     //     }

//     const product = await sanity.fetch(
//       `*[_type == "product" && productID == ${productID}][0] {
//             "variants": *[_type == "productVariant" && productID == ${productID}]{
//             variantID,
//             options[]{name, value}
//             },

//             }`,
//     );

//     if (!product) {
//       return NextResponse.json(
//         { error: "Product not found in Sanity" },
//         { status: 404, headers },
//       );
//     }

//     const hasVariantPhotos =
//       product.cartPhotos.length > 1 ||
//       product.cartPhotos.some((set: { forOption: any }) => set.forOption);

//     //associate our variants with each photo set
//     const variantPhotoSets = product.cartPhotos.map(
//       (set: { forOption: string; default: any }) => {
//         const optName = set.forOption?.split(":")[0];
//         const optValue = set.forOption?.split(":")[1];
//         const newVariants = product.variants.filter((v: { option: any[] }) =>
//           v.option.some(
//             (opt) => opt.name === optName && opt.value === optValue,
//           ),
//         );

//         return {
//           variants: newVariants,
//           photo: set.default,
//         };
//       },
//     );

//     /**
//      * Write Images to Shopify
//      */

//     const shopifyConfig = {
//       "Content-Type": "application/json",
//       "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_TOKEN,
//     };

//     const payload = {
//       product: {
//         id: productID,
//         images: hasVariantPhotos
//           ? variantPhotoSets.map(
//               (set: { photo: any; variants: { variantID: any }[] }) => ({
//                 src: set.photo,
//                 variant_ids: set.variants.map(
//                   (v: { variantID: any }) => v.variantID,
//                 ),
//               }),
//             )
//           : [{ src: product.cartPhotos[0].default }],
//       },
//     };

//     const response = await axios.put(
//       `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID}.myshopify.com/admin/api/2025-10/products/${productID}.json`,
//       payload,
//       { headers: shopifyConfig },
//     );

//     return NextResponse.json(response.data, { status: 200, headers });
//   } catch (error: any) {
//     console.error("Error updating Shopify cart Photos:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }
