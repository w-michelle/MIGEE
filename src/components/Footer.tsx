import { sanityFetchStatic } from "@/sanity/lib/sanityFetchStatic";
import { FooterContent } from "./FooterContent";
import { FooterReassurance } from "./FooterReassurance";
import Newsletter from "./Newsletter";
import { Contact } from "@/app/(store)/(footer)/component/contact";

export const Footer = async () => {
  const FOOTER_QUERY = `*[_type == "footerSection"] | order(order asc) {
            title,
            pages[]->{
            title,
            slug,
            items[]{title, content}
            }
        }`;
  const pages = await sanityFetchStatic({ query: FOOTER_QUERY });

  console.log("footer", pages);

  return (
    <footer className="mt-auto">
      <FooterReassurance />
      <section className="border-y border-neutral-400 flex flex-col md:flex-row">
        <Newsletter />
        <Contact />
      </section>
      <FooterContent pages={pages} />
    </footer>
  );
};
