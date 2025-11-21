import ProductPreviewMedia from "@/components/productPreviewMedia";

import { TrolleyIcon } from "@sanity/icons";
import { BsCloudArrowDown } from "react-icons/bs";
import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  groups: [
    { title: "Content", name: "content", default: true },
    { title: "Settings", name: "settings" },
    { title: "Shopify Data", name: "shopify", icon: BsCloudArrowDown },
  ],
  fieldsets: [
    {
      title: "",
      name: "2up",
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({
      title: "Display Title",
      name: "title",
      type: "string",
      group: "content",
    }),
    defineField({
      title: "Shopify Description",
      name: "shopifyDescription",
      type: "text",
      readOnly: true,
      group: "content",
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "blockContent",
      group: "content",
    }),

    defineField({
      title: "SEO / Share Settings",
      name: "seo",
      type: "seo",
      group: "settings",
    }),
    defineField({
      title: "Product Title",
      name: "productTitle",
      type: "string",
      readOnly: true,
      fieldset: "2up",
      group: "shopify",
    }),
    defineField({
      title: "Product ID",
      name: "productID",
      type: "number",
      readOnly: true,
      fieldset: "2up",
      group: "shopify",
    }),
    defineField({
      title: "Shopify Image",
      name: "productImage",
      type: "url",
      readOnly: true,
      group: "shopify",
    }),
    defineField({
      title: "Price (cents)",
      name: "price",
      type: "number",
      readOnly: true,
      fieldset: "2up",
      group: "shopify",
    }),
    defineField({
      title: "Compare Price (cents)",
      name: "comparePrice",
      type: "number",
      readOnly: true,
      fieldset: "2up",
      group: "shopify",
    }),
    defineField({
      title: "In Stock?",
      name: "inStock",
      type: "boolean",
      readOnly: true,
      fieldset: "2up",
      group: "shopify",
    }),
    defineField({
      title: "Low Stock?",
      name: "lowStock",
      type: "boolean",
      readOnly: true,
      fieldset: "2up",
      group: "shopify",
    }),
    defineField({
      title: "SKU",
      name: "sku",
      type: "string",
      readOnly: true,
      fieldset: "2up",
      group: "shopify",
    }),
    defineField({
      title: "URL Slug",
      name: "slug",
      type: "slug",
      readOnly: true,
      fieldset: "2up",
      group: "shopify",
    }),
    defineField({
      title: "Options",
      name: "options",
      type: "array",
      of: [{ type: "productOption" }],
      readOnly: false,
      group: "shopify",
    }),
    defineField({
      title: "Draft Mode",
      name: "isDraft",
      type: "boolean",
      readOnly: true,
      hidden: true,
      fieldset: "2up",
      group: "shopify",
    }),
    defineField({
      title: "Deleted from Shopify?",
      name: "wasDeleted",
      type: "boolean",
      readOnly: true,
      hidden: true,
      fieldset: "2up",
      group: "shopify",
    }),
  ],
  preview: {
    select: {
      wasDeleted: "wasDeleted",
      title: "title",
      subtitle: "price",
      productTitle: "productTitle",
      media: "productImage",
      slug: "slug",
    },
    prepare({ productTitle, subtitle, media, slug }) {
      const slugValue = slug?.current || "missing-slug";
      const path = `/products/${slugValue}`;

      return {
        title: productTitle,
        subtitle: path,
        media: () => ProductPreviewMedia({ url: media }),
      };
    },
  },
});
