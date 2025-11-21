import { type SchemaTypeDefinition } from "sanity";
import { product } from "./documents/product";
import { blockContent } from "./objects/blockContent";
import { promo } from "./documents/promo";
import { seo } from "./objects/seo";
import { productOption } from "./objects/product-option";
import { collection } from "./documents/collection";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, collection, blockContent, promo, seo, productOption],
};
