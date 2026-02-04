"use client";
import { useModal } from "@/store/useModal";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { PiUserLight } from "react-icons/pi";
import { TfiClose } from "react-icons/tfi";
import { CiChat1, CiSearch } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { Collection } from "../../../sanity.types";
import { useCartStore } from "@/store/cartStore";
import { usePathname, useRouter } from "next/navigation";

const MenuModal = ({ collections }: { collections: Collection[] }) => {
  const { openModal, onClose } = useModal();
  const { toggleCart } = useCartStore();
  const isMenuOpen = openModal === "menu";
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();

    const formData = new FormData(e.currentTarget);
    const query = formData.get("query");
    if (query) {
      router.push(`/search?query=${encodeURIComponent(query.toString())}`);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openModal]);

  useEffect(() => {
    if (openModal) {
      onClose();
    }
  }, [pathname]);

  if (openModal !== "menu") return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile menu"
      className="absolute text-neutral-700 inset-0 w-full h-screen overflow-hidden bg-white z-100"
    >
      <div className="h-full flex flex-col">
        <header className="flex justify-between px-4 py-4">
          <Link
            href="/"
            aria-label="Migee home"
          >
            <div className="relative w-[110px] h-10 cursor-pointer">
              <Image
                src="/migee.png"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
          </Link>
          <button
            type="button"
            onClick={() => onClose()}
            className="text-gray-700 cursor-pointer"
            aria-label="Close menu modal"
          >
            <TfiClose size={14} />
          </button>
        </header>

        <div className="flex flex-col h-full mt-8">
          <div className="flex items-center mx-4 border-b mb-6">
            <CiSearch size={18} />
            <form
              onSubmit={handleSubmit}
              className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
              role="search"
            >
              <label
                htmlFor="search"
                className="sr-only"
              >
                Search products
              </label>
              <input
                type="text"
                id="search"
                name="query"
                placeholder="Search here..."
                className="text-sm text-gray-800 px-2 py-1 focus:outline-none  w-full max-w-4xl"
              />
            </form>
          </div>
          {/* nav */}
          <nav className="mb-6">
            <ul>
              {collections.map((item) => (
                <li
                  key={item._id}
                  className="border-b border-gray-300 p-4 w-full"
                >
                  <Link href={`/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-xs space-y-6 px-4 pb-14 mt-auto">
            <button
              onClick={() => toggleCart()}
              className="cursor-pointer flex items-center gap-4"
              aria-label="Open shopping bag"
            >
              <GoDotFill size={14} />
              <span>Shopping cart</span>
            </button>

            <Link
              href="/account"
              className="cursor-pointer flex gap-4"
            >
              <PiUserLight size={14} />
              <p>Account</p>
            </Link>
            <Link
              href="/company/contact-us"
              className="flex gap-4"
            >
              <CiChat1 size={14} />
              <p>Customer Care</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
