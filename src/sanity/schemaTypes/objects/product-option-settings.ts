import OptionSelector from "@/sanity/components/ProductOptionSelector";
import { getSwatch } from "@/sanity/lib/helpers";
import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productOptionSettings = defineType({
  title: "Option Settings",
  name: "productOptionSettings",
  type: "object",
  icon: CogIcon,
  fields: [
    defineField({
      title: "Which option is this for?",
      name: "forOption",
      type: "string",
      components: {
        input: OptionSelector,
      },
    }),
    defineField({
      title: "Color Swatch",
      name: "color",
      type: "reference",
      to: [{ type: "solidColor" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      color: "color.color",
      forOption: "forOption",
    },
    prepare({ color, forOption }) {
      const option = forOption ? forOption.split(":") : null;

      return {
        title:
          option && option.length > 0
            ? `${option[0]}: ${option[1]}`
            : "All Variants",
        media: color?.hex ? getSwatch(color.hex.toUpperCase()) : null,
      };
    },
  },
});
