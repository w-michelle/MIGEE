import { defineField, defineType } from "sanity";
import { CheckmarkCircleIcon } from "@sanity/icons";

export const productOptionValue = defineType({
  title: "Option",
  name: "productOptionValue",
  type: "object",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
    }),
    defineField({
      title: "Value",
      name: "value",
      type: "string",
    }),
    defineField({
      title: "Position",
      name: "position",
      type: "number",
    }),
  ],
});
