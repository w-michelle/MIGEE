import { getSwatch } from "@/sanity/lib/helpers";
import { ColorWheelIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const color = defineType({
  title: "Color",
  name: "solidColor",
  type: "document",
  icon: ColorWheelIcon,
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "For internal purposes, to help identify your colors",
    }),
    defineField({
      title: "Color",
      name: "color",
      type: "color",
      options: {
        disableAlpha: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      color: "color",
    },
    prepare({ title, color }) {
      return {
        title: title,
        subtitle: color?.hex ? color.hex.toUpperCase() : "",
        media: color?.hex ? getSwatch(color.hex.toUpperCase()) : null,
      };
    },
  },
});
