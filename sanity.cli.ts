/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";
import path from "path";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    appId: "h11x3bnuhc6m0uj87yqrnx38",
  },
  vite: (config: any) => {
    console.log("vite CONFIG HOOK IS RUNNING");
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          "@": path.resolve(__dirname, "./src"),
        },
      },
    };
  },
});
