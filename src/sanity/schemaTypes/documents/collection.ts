/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProjectsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const collection = defineType({
  title: "Collection",
  name: "collection",
  type: "document",
  icon: ProjectsIcon,
  groups: [
    {
      title: "Content",
      name: "content",
      default: true,
    },
    {
      title: "Settings",
      name: "settings",
    },
  ],
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "settings",
    }),
    defineField({
      title: "URL Slug",
      name: "slug",
      type: "slug",
      description: "(required)",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "settings",
    }),
    defineField({
      title: "Product Grid",
      name: "products",
      type: "array",
      of: [
        {
          title: "Product",
          type: "reference",
          to: [{ type: "product" }],
          options: {
            filter: ({ document }) => {
              const doc = document as Record<string, any>;
              const addedProducts = doc.products
                .map((p: { _ref: any }) => p._ref)
                .filter(Boolean);
              return {
                filter: "!(_id in $ids)",
                params: {
                  ids: addedProducts,
                },
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
      group: "content",
    }),
    defineField({
      title: "SEO / Share Settings",
      name: "seo",
      type: "seo",
      group: "settings",
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug",
    },
    prepare({ title = "Untitled", slug = {} }) {
      const path = `/shop/${slug.current}`;
      return {
        title,
        subtitle: slug.current ? path : "(missing slug)",
      };
    },
  },
});
