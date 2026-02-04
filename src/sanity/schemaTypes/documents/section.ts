import { defineField, defineType } from "sanity";
import { getModuleName } from "../../lib/helpers";

import { DashboardIcon } from "@sanity/icons";

export const section = defineType({
  title: "Reusable Section",
  name: "section",
  type: "document",
  icon: DashboardIcon,
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      description:
        "Provide a name to reference this section. For internal use only.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Content",
      name: "content",
      type: "array",
      of: [{ type: "hero" }, { type: "marquee" }, { type: "dividerPhoto" }],
      validation: (Rule) =>
        Rule.length(1).error("You can only have one piece of content"),
    }),
  ],
  preview: {
    select: {
      name: "name",
      content: "content.0",
    },

    prepare({ name, content }) {
      return {
        title: name,
        subtitle: getModuleName(content._type),
      };
    },
  },
});
