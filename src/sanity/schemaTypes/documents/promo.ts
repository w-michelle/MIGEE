import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const promo = defineType({
  name: "promo",
  title: "Promo",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      title: "Enable Promo Bar?",
      name: "enabled",
      type: "boolean",
    }),
    defineField({
      title: "Text",
      name: "text",
      type: "string",
      description: "The text to show on the banner",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Promo Bar Settings",
      };
    },
  },
});
