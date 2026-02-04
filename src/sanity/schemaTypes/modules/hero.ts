import { defineField, defineType } from "sanity";
import customImage from "../../lib/custom-image";
import { StarIcon } from "@sanity/icons";

export const Hero = defineType({
  title: "Hero",
  name: "hero",
  type: "object",
  icon: StarIcon,
  fields: [
    defineField({
      title: "Background Type",
      name: "bgType",
      type: "string",
      options: {
        list: [
          { title: "Photo", value: "photo" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [customImage()],
      hidden: ({ parent }) => {
        return parent.bgType !== "photo";
      },
    }),
    defineField({
      name: "video",
      type: "object",
      fields: [
        {
          title: "Background Video",
          name: "id",
          type: "string",
          description:
            "Alternatively, enter a vimeo ID to show a looping video instead",
        },
        {
          title: "Background Video Title",
          name: "title",
          type: "string",
          description: "Short title/description of the video",
        },
      ],
      hidden: ({ parent }) => {
        return parent.bgType !== "video";
      },
    }),
  ],
  preview: {
    select: {
      photo: "photo",
      content: "content.0.children",
    },
    prepare({ photo, content }) {
      return {
        title: "Hero",
        subtitle: content && content[0]?.text,
        media: photo,
      };
    },
  },
});
