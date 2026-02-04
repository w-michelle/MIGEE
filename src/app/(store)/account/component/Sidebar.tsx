"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/account", label: "About You" },
    { href: "/account/orders", label: "Order History" },
    { href: "/api/logout", label: "Logout" },
  ];
  return (
    <aside className="md:w-64 text-xs w-full pt-6">
      <nav className="h-full flex flex-row md:flex-col items-start px-8 gap-8 md:gap-0">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
          >
            <button
              className={`cursor-pointer ${pathname === item.href ? "text-black" : "text-neutral-400"} my-3 w-full`}
            >
              {item.label}
            </button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
