/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// /**
//  * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
//  */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { colorInput } from "@sanity/color-input";
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const apiVersion = "2025-11-12";
export default defineConfig({
  basePath: "/studio",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: { types: schema.types },
  plugins: [
    structureTool({ structure }),
    colorInput(),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
