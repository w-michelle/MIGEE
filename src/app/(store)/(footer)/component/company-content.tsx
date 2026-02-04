"use client";
import { usePathname } from "next/navigation";
import { SidebarMenu } from "./sidebar-menu";
import PortableTextBlock from "@/components/PortableText";
import { MobileSidebarMenu } from "./mobile-sidebar-menu";

/* eslint-disable @typescript-eslint/no-explicit-any */
const PageContent = ({ pages, title, activePage }: any) => {
  const pathname = usePathname();

  return (
    <main className="px-8 py-10 h-screen overflow-y-auto">
      <h1 className="pb-8">{title}</h1>
      <div className="md:hidden pb-10">
        <MobileSidebarMenu
          pages={pages}
          title={title}
        />
      </div>
      <hr />

      <div className="flex flex-col md:flex-row ">
        <div className="hidden md:block">
          <SidebarMenu
            pages={pages}
            title={title}
          />
        </div>

        <article className="py-10 flex-1">
          {activePage.items.map((item: any) => (
            <div key={item.title}>
              <PortableTextBlock value={item.content} />
            </div>
          ))}
        </article>
      </div>
    </main>
  );
};

export default PageContent;
