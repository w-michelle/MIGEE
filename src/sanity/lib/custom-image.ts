/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineField } from "sanity";

export default function customImage({
  hasDisplayOptions = true,
  ...props
} = {}) {
  const crops = [
    { title: "Original", value: 0 },
    { title: "1 : 1 (square)", value: 1 },
    { title: "5 : 7", value: 0.7142857143 },
    { title: "4: 6", value: 0.6666666667 },
    { title: "16 : 9", value: 1.7777777778 },
  ];

  return {
    title: "Photo",
    name: "photo",
    type: "image",
    options: {
      hotspot: true,
    },
    fields: [
      ...(hasDisplayOptions
        ? [
            defineField({
              title: "Display Size (aspect ratio)",
              name: "customRatio",
              type: "number",
              options: { list: crops },
              validation: (Rule) =>
                Rule.custom((field, context) => {
                  const parent = context.parent;
                  const hasAsset =
                    typeof parent === "object" &&
                    parent !== null &&
                    "asset" in parent;
                  return hasAsset && field === undefined ? "Required!" : true;
                }),
            }),
          ]
        : []),
      defineField({
        title: "Alternative text",
        name: "alt",
        type: "string",
        description: "Important for SEO and accessibility.",
      }),
    ],
    preview: {
      select: {
        asset: "asset",
        customAlt: "alt",
        customRatio: "customRatio",
      },
      prepare({
        customAlt,
        customRatio,
        asset,
      }: {
        customAlt?: string;
        customRatio?: number;
        asset?: any;
      }) {
        const crop = crops.find((crop) => crop.value === customRatio);

        return {
          title: customAlt ?? "(alt text missing)",
          subtitle: crop?.title ?? "Original",
          media: asset,
        };
      },
    },
    ...props,
  };
}
