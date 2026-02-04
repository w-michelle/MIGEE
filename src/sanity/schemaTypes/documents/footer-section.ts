import { defineField, defineType } from "sanity";

export const footerSection = defineType({
  name: "footerSection",
  title: "Footer Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pages",
      title: "Pages",
      type: "array",
      of: [{ type: "reference", to: [{ type: "infoPage" }] }],
    }),
  ],
});
