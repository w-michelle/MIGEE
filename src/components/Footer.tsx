"use client";
import Accordion from "./Accordion";
import { companyPages } from "@/app/data/footerPages/companyPages";
import { faqPages } from "@/app/data/footerPages/faqPages";
import { followPages } from "@/app/data/footerPages/followPages";
import { legalPages } from "@/app/data/footerPages/legalPages";
import { li } from "motion/react-client";
import Link from "next/link";
export const Footer = () => {
  return (
    <footer className="">
      <ul className="flex flex-col">
        <Accordion
          data={companyPages}
          name="Company"
        />
        <Accordion
          data={faqPages}
          name="FAQ"
        />
        <Accordion
          data={followPages}
          name="Follow"
        />
      </ul>
      <div className="text-xs px-6 py-4 flex gap-4">
        <p>© MIGEE 2025</p>
        <ul className="flex gap-4">
          {legalPages.map((item) => (
            <li key={item.title}>
              <Link href={item.slug}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
