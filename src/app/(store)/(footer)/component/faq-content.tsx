/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { usePathname } from "next/navigation";
import { SidebarMenu } from "./sidebar-menu";
import { FaqAccordion } from "./faq-accordion";

const FaqContent = ({ pages, title, activePage }: any) => {
  const pathname = usePathname();

  return (
    <main className="px-8 py-10 h-screen overflow-y-auto">
      <h1 className="pb-8">{title}</h1>
      <hr />

      <div className="flex">
        <SidebarMenu
          pages={pages}
          title={title}
        />
        <ul className="py-8 flex-1">
          {activePage.items.map((item: any) => (
            <FaqAccordion
              key={item.title}
              item={item}
            />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default FaqContent;
