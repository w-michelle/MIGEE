/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileSidebarMenu = ({ pages, title }: any) => {
  const pathname = usePathname();

  return (
    <nav className="w-full flex text-xs gap-8">
      {pages.map((item: any) => (
        <Link
          key={item.href || item.slug?.current}
          href={item.href || `/${title.toLowerCase()}/${item.slug?.current}`}
        >
          <button
            className={`cursor-pointer ${pathname.split("/").pop() === item.slug.current ? "text-black" : "text-neutral-400"} w-full`}
          >
            {item.label || item.title}
          </button>
        </Link>
      ))}
    </nav>
  );
};
