import { defineType } from "sanity";

export const infoPage = defineType({
  name: "infoPage",
  title: "Info Page",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "items",
      title: "Content Items",
      type: "array",
      of: [{ type: "infoBlock" }],
    },
  ],
});
