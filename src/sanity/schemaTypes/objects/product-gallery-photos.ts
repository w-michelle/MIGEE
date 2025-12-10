import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";
import OptionSelector from "@/sanity/components/ProductOptionSelector";
import customImage from "@/sanity/lib/custom-image";
export const productGallery = defineType({
  title: "Gallery",
  name: "productGalleryPhotos",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      title: "Which variants is this for",
      name: "forOption",
      type: "string",
      components: {
        input: OptionSelector,
      },
    }),
    defineField({
      title: "Gallery Photo(s)",
      name: "photos",
      type: "array",
      of: [customImage()],
      options: {
        layout: "grid",
      },
    }),
  ],
  preview: {
    select: {
      photos: "photos",
      forOption: "forOption",
    },
    prepare({ photos, forOption }) {
      const option = forOption ? forOption.split(":") : null;

      return {
        title:
          option && option.length > 1
            ? `${option[0]}: ${option[1]}`
            : "All Variants",
        media: photos ? photos[0] : null,
      };
    },
  },
});
