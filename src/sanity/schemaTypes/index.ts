import { type SchemaTypeDefinition } from "sanity";
import { product } from "./documents/product";
import { category } from "./objects/category";
import { blockContent } from "./objects/blockContent";
import { promo } from "./documents/promo";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, blockContent, promo],
};
