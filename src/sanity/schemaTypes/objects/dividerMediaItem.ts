import customImage from "@/sanity/lib/custom-image";
import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const dividerMediaItem = defineType({
  title: "Media Item",
  name: "dividerMediaItem",
  type: "object",
  fields: [
    defineField({
      title: "Media Type",
      name: "mediaType",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "image",
      fields: customImage().fields,
    }),
    defineField({
      title: "Video",
      name: "video",
      type: "file",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
  ],
  preview: {
    select: {
      mediaType: "mediaType",
      image: "image",
      video: "video",
    },

    prepare({ mediaType, image, video }) {
      return {
        title: "Divider Media",
        subtitle: mediaType === "video" ? "Video" : "Image",
        media: mediaType === "video" ? PlayIcon : image,
      };
    },
  },
});
