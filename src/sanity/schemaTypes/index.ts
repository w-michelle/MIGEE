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
import { dividerPhoto } from "./modules/divider-photo";
import { marquee } from "./modules/marquee";
import { section } from "./documents/section";
import { Hero } from "./modules/hero";
import { page } from "./documents/page";
import { dividerMediaItem } from "./objects/dividerMediaItem";
import { footerSection } from "./documents/footer-section";
import { infoPage } from "./objects/info-page";
import { infoBlock } from "./objects/info-block";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    product,
    page,
    Hero,
    section,
    marquee,
    dividerPhoto,
    dividerMediaItem,
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
    footerSection,
    infoBlock,
    infoPage,
  ],
};
