/* eslint-disable @typescript-eslint/no-explicit-any */

import { notFound } from "next/navigation";
import PageContent from "../../component/company-content";
import { sanityFetchStatic } from "@/sanity/lib/sanityFetchStatic";

export async function generateStaticParams() {
  const PAGES_QUERY = `*[_type == "footerSection" && slug.current == "legal"][0]{
            title,
            pages[]->{
            slug,
            }
        }`;

  const pages = await sanityFetchStatic({ query: PAGES_QUERY });

  return pages.pages.map((p: any) => ({ page: p.slug.current }));
}

async function LegalPage({ params }: { params: { page: string } }) {
  const { page } = await params;

  const SECTION_QUERY = `*[_type == "footerSection" && slug.current == "legal"][0]{
            title,
            pages[]->{
            title,
            slug,
            items[]{title, content}
            }
        }`;

  const pages = await sanityFetchStatic({ query: SECTION_QUERY });

  const currentPage = pages.pages.find((p: any) => p.slug.current === page);

  if (!currentPage) {
    return notFound();
  }

  return (
    <PageContent
      pages={pages.pages}
      title={pages.title}
      activePage={currentPage}
    />
  );
}

export default LegalPage;
