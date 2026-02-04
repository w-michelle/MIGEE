/* eslint-disable @typescript-eslint/no-explicit-any */

import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "../data/mutations/cart/queries";
import { notFound } from "next/navigation";
import RenderModule from "@/components/RenderModule";
import { Metadata } from "next";
import { getHomepage } from "@/sanity/lib/getHomepage";

export default async function Home() {
  const page = await sanityFetch({ query: HOME_PAGE_QUERY });

  if (!page) {
    notFound();
  }

  return (
    <div className="">
      {page.data.modules.map((module: any) => (
        <RenderModule
          key={module._key}
          module={module}
        />
      ))}
    </div>
  );
}
