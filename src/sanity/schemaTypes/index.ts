import { type SchemaTypeDefinition } from "sanity";
import { product } from "./documents/product";
import { blockContent } from "./objects/blockContent";
import { promo } from "./documents/promo";
import { seo } from "./objects/seo";
import { productOption } from "./objects/product-option";
import { collection } from "./documents/collection";
import { color } from "./documents/color";
import { productOptionSettings } from "./objects/product-option-settings";
import { variants } from "./documents/variants";
import { productGallery } from "./objects/product-gallery-photos";
import { productOptionValue } from "./objects/product-option-value";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    collection,
    blockContent,
    promo,
    seo,
    productOption,
    productOptionValue,
    productOptionSettings,
    productGallery,
    color,
    variants,
  ],
};
