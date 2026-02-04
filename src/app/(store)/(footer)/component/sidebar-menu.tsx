/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FaqPageProps {
  href?: string;
  label?: string;
  title?: string;
  slug?: {
    current: string;
  };
}

export const SidebarMenu = ({ pages, title }: any) => {
  const pathname = usePathname();

  return (
    <aside className="w-64 text-xs pt-8">
      <nav className="h-full flex flex-col items-start ">
        {pages.map((item: any) => (
          <Link
            key={item.href || item.slug?.current}
            href={item.href || `/${title.toLowerCase()}/${item.slug?.current}`}
          >
            <button
              className={`cursor-pointer ${pathname.split("/").pop() === item.slug.current ? "text-black" : "text-neutral-400"} my-3 w-full`}
            >
              {item.label || item.title}
            </button>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
