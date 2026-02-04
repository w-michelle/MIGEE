import { defineType } from "sanity";

export const infoBlock = defineType({
  name: "infoBlock",
  title: "Section Item",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Title / Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "content",
      title: "Content / Answer",
      type: "blockContent",
    },
  ],
});
