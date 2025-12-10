/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto";
import { createClient, IdentifiedSanityDocumentStub } from "@sanity/client";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { diff } from "jsondiffpatch";
import axios from "axios";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2025-02-19",
  useCdn: false,
});

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);

    const hmac = request.headers.get("x-shopify-hmac-sha256");

    if (!hmac) {
      return NextResponse.json(
        { error: "Missing HMAC signature" },
        { status: 401 },
      );
    }

    const generatedHash = crypto
      .createHmac("sha256", process.env.SHOPIFY_WEBHOOK_INTEGRITY!)
      .update(rawBody, "utf8")
      .digest("base64");

    if (hmac !== generatedHash) {
      console.error("Invalid HMAC signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const {
      id,
      title,
      handle,
      status,
      variants,
      options,
      image,
      images,
      body_html,
    } = body;
    console.log("the body", body);
    console.log(`Syncing product: "${title}" (ID: ${id})`);

    //define product document

    const product = {
      _type: "product",
      _id: `product-${id}`,
    };

    //product options if there is more than one variant

    const productOptions = options.map((option: any) => ({
      _key: option.id,
      _type: "productOption",
      name: option.name,
      values: option.values,
      position: option.position,
    }));
    const productFields = {
      wasDeleted: false,
      isDraft: status === "draft" ? true : false,
      productTitle: title,
      productID: id,
      productImage: image ? image.src : null,
      shopifyDescription: body_html ?? "",
      slug: { current: handle },
      price: variants[0].price * 100,
      comparePrice: variants[0].compare_at_price * 100,
      sku: variants[0].sku || "",
      inStock: variants.some(
        (v: { inventory_quantity: number; inventory_policy: string }) =>
          v.inventory_quantity > 0 || v.inventory_policy === "continue",
      ),
      lowStock:
        variants.reduce(
          (a: any, b: { inventory_quantity: any }) =>
            a + (b.inventory_quantity || 0),
          0,
        ) <= 10,
      options: productOptions,
    };

    //product variants doc

    const productVariants = variants
      .sort((a: { id: number }, b: { id: number }) => (a.id > b.id ? 1 : -1))
      .map((variant: { id: any }) => ({
        _type: "productVariant",
        _id: `productVariant-${variant.id}`,
      }));

    //product variant fields

    const productVariantFields = variants
      .sort((a: { id: number }, b: { id: number }) => (a.id > b.id ? 1 : -1))
      .map(
        (variant: {
          [x: string]: any;
          title: any;
          id: any;
          price: number;
          compare_at_price: number;
          sku: any;
          inventory_quantity: number;
          inventory_policy: string;
        }) => ({
          isDraft: status === "draft" ? true : false,
          productTitle: title,
          productID: id,
          variantTitle: variant.title,
          variantID: variant.id,
          price: variant.price * 100,
          comparePrice: variant.compare_at_price * 100,
          sku: variant.sku || "",
          inStock:
            variant.inventory_quantity > 0 ||
            variant.inventory_policy === "continue",
          lowStock: variant.inventory_quantity <= 5,
          options: options.map(
            (option: { id: any; name: any; position: any }) => ({
              _key: option.id,
              _type: "productOptionValue",
              name: option.name,
              value: variant[`option${option.position}`],
              position: option.position,
            }),
          ),
        }),
      );

    //construct our comparative product object

    const productCompare = {
      ...product,
      ...productFields,
      ...{
        variants: productVariants.map((variant: any, key: string | number) => ({
          ...variant,
          ...productVariantFields[key],
        })),
      },
    };

    /*
       * Check for previous sync

       */

    console.log("checking for previous sync data...");

    //Set up our shopify connection

    const shopifyConfig = {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip, deflate, compress",
      "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_TOKEN,
    };

    //Fetch metafields for this product
    const shopifyProduct = await axios.get(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID}.myshopify.com/admin/api/2025-10/products/${id}/metafields.json`,
      { headers: shopifyConfig },
    );

    //check if metafield exists
    const previousSync = shopifyProduct.data?.metafields.find(
      (mf: { key: string }) => mf.key === "product_sync",
    );

    //metafield found
    if (previousSync) {
      console.log("Previous sync found, comparing differences...");

      //differences found
      if (diff(JSON.parse(previousSync.value), productCompare)) {
        console.warn("Critical difference found! Start sync...");

        //update our shopify metafield with the new data before continuing sync with sanity

        await axios.put(
          `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID}.myshopify.com/admin/api/2025-10/products/${id}/metafields/${previousSync.id}.json`,

          {
            metafield: {
              id: previousSync.id,
              value: JSON.stringify(productCompare),
              type: "json",
            },
          },
          { headers: shopifyConfig },
        );
      } else {
        console.info("No differences found, sync complete!");
        return NextResponse.json({ message: "Up to date" }, { status: 200 });
      }
      //no changes found
    } else {
      console.warn("No previous sync found, Start sync...");
      await axios.post(
        `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_ID}.myshopify.com/admin/api/2025-10/products/${id}/metafields.json`,

        {
          metafield: {
            namespace: "sanity",
            key: "product_sync",
            value: JSON.stringify(productCompare),
            type: "json",
          },
        },
        { headers: shopifyConfig },
      );
    }

    /**
     * Begin Sanity Product Sync
     */

    console.log("Writing product to Sanity...");

    let stx = sanity.transaction();

    //create product if doesnt exist

    stx = stx.createIfNotExists(product);

    //unset options field first, to avoid patch set issues
    stx = stx.patch(`product-${id}`, (patch) => patch.unset(["options"]));

    //patch (update) product document with core shopify data
    stx = stx.patch(`product-${id}`, (patch) => patch.set(productFields));

    //patch(update) title & slug if none has been set
    stx = stx.patch(`product-${id}`, (patch) =>
      patch.setIfMissing({ title: title }),
    );

    //create variant if doesnt exist & patch (update) variant with core shopify data
    productVariants.forEach(
      (
        variant: IdentifiedSanityDocumentStub<Record<string, any>>,
        i: string | number,
      ) => {
        stx = stx.createIfNotExists(variant);
        stx = stx.patch(variant._id, (patch) =>
          patch.set(productVariantFields[i]),
        );
        stx = stx.patch(variant._id, (patch) =>
          patch.setIfMissing({ title: productVariantFields[i].variantTitle }),
        );
      },
    );

    //grab current variants
    const currentVariants =
      await sanity.fetch(`*[_type == "productVariant" && productID == ${id}]{
      _id
      }`);

    //mark deleted variants
    currentVariants.forEach((cv: { _id: string }) => {
      const active = productVariants.some(
        (v: { _id: string }) => v._id === cv._id,
      );

      if (!active) {
        stx = stx.patch(cv._id, (patch) => patch.set({ wasDeleted: true }));
      }
    });
    const result = await stx.commit();

    console.info("Sync complete!");
    console.log(result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
