/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { InfoPage } from "../../sanity.types";
import Link from "next/link";
import Accordion from "./Accordion";

interface FooterContentProps {
  pages: InfoPage[];
}
//todo: pass the slug and title, so like href and label
export const FooterContent = ({ pages }: FooterContentProps) => {
  return (
    <section className="mt-auto">
      <div className="hidden md:flex justify-between mx-8 my-12">
        {pages.map((item) => (
          <nav key={item.title}>
            <h2 className="text-xs mb-2">{item.title}</h2>
            <ul className="text-xs text-neutral-400">
              {item.title == "Follow"
                ? item.pages.map((itemLinks: any) => (
                    <li
                      key={itemLinks.title}
                      className="mb-2"
                    >
                      <Link
                        href={itemLinks.slug.current}
                        className="hover:text-black"
                      >
                        {itemLinks.title}
                      </Link>
                    </li>
                  ))
                : item.pages.map((itemLinks: any) => (
                    <li
                      key={itemLinks.title}
                      className="mb-2"
                    >
                      <Link
                        href={`/${item.title?.toLowerCase()}/${itemLinks.slug.current}`}
                        className="hover:text-black"
                      >
                        {itemLinks.title}
                      </Link>
                    </li>
                  ))}
            </ul>
          </nav>
        ))}
      </div>

      <ul className="md:hidden flex flex-col">
        {pages.map((item) => (
          <Accordion
            key={item.title}
            data={item}
            name={item.title || "Info"}
          />
        ))}
      </ul>
      <div className="text-xs px-6 py-4 flex gap-4 border-t border-neutral-400">
        <small>© MIGEE 2025</small>
      </div>
    </section>
  );
};
