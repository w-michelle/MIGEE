import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const page = defineType({
  title: "Page",
  name: "page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { title: "Content", name: "content", default: true },
    { title: "Settings", name: "settings" },
  ],
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "URL Slug",
      name: "slug",
      type: "slug",
      description: "(required)",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "settings",
    }),
    defineField({
      title: "Overlay header with transparency?",
      name: "hasTransparentHeader",
      type: "boolean",
      description:
        "When activated the header willl overlay the first content module with a transparent background and white text until scrolling is enagaged.",
      initialValue: false,
      group: "settings",
    }),
    defineField({
      title: "Page Content",
      name: "modules",
      type: "array",
      of: [
        { type: "hero" },
        { type: "marquee" },
        { type: "dividerPhoto" },
        {
          title: "Reusable Section",
          type: "reference",
          to: [{ type: "section" }],
        },
      ],
      group: "content",
    }),
    defineField({
      title: "SEO / Share Settings",
      name: "seo",
      type: "seo",
      group: "settings",
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug",
    },
    prepare({ title = "Untitled", slug = {} }) {
      const slugValue = slug && slug.current ? slug.current : null;
      const path = `/${slugValue}`;

      return {
        title,
        subtitle: slugValue ? path : "(missing slug)",
      };
    },
  },
});
