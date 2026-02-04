import { defineField, defineType } from "sanity";

import { ImageIcon } from "@sanity/icons";

export const dividerPhoto = defineType({
  title: "Divider Media",
  name: "dividerPhoto",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      title: "Media (Side by Side",
      name: "media",
      type: "array",
      of: [{ type: "dividerMediaItem" }],
      validation: (Rule) =>
        Rule.required().min(2).error("Please add at least 2 media items"),
    }),
  ],
  preview: {
    select: {
      media: "media",
    },

    prepare({ media }) {
      return {
        title: "Divider Media",
        subtitle: `${media?.length || 0} items`,
      };
    },
  },
});
