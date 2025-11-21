import { CheckmarkCircleIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productOption = defineType({
  title: "Product Option",
  name: "productOption",
  type: "object",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
    }),
    defineField({
      title: "Position",
      name: "position",
      type: "number",
    }),
    defineField({
      title: "Values",
      name: "values",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
  ],
});
