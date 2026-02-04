"use client";
import Image from "next/image";
import Form from "next/form";

import { PiUserLight } from "react-icons/pi";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import * as motion from "motion/react-client";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

import { useModal } from "@/store/useModal";
import { useCart } from "@/hooks/useCart";
import { Collection } from "../../sanity.types";
import MenuModal from "./modals/menuModal";

function Header({ collections }: { collections: Collection[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const { toggleCart, cartId } = useCartStore();
  const { data } = useCart(cartId);
  const { onOpen } = useModal();

  return (
    <header className="px-8 py-4 sticky top-0 z-10">
      <h1 className="sr-only">Migee</h1>
      <div className="flex justify-between">
        <div className="flex gap-10">
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
          <nav className="hidden md:block my-4 text-sm">
            <ul className="flex gap-10">
              {collections.map((item) => (
                <li key={item._id}>
                  <Link
                    href={`/collections/${item.slug}`}
                    className=""
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <nav
          aria-label="User actions"
          className="hidden md:flex items-center gap-8"
        >
          {/* search */}
          <div className="flex">
            <AnimatePresence initial={false}>
              <motion.button
                className="cursor-pointer"
                whileTap={{ y: 1 }}
                onClick={() => setIsVisible(!isVisible)}
                aria-label="Toggle search"
                aria-expanded={isVisible}
              >
                <CiSearch size={18} />
              </motion.button>
              {isVisible ? (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "200px" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  key="search"
                >
                  <Form
                    action="/search"
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
                      className="text-sm text-gray-800 px-2 py-1 focus:outline-none border-b w-full max-w-4xl"
                    />
                  </Form>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <Link
            href="/account"
            aria-label="Your account"
          >
            <PiUserLight size={18} />
          </Link>

          <button
            onClick={() => toggleCart()}
            className="cursor-pointer flex items-center gap-1 text-xs"
            aria-label="Open shopping bag"
          >
            <p>Shopping bag</p>
            {/* <CiShoppingCart size={18} /> */}
            <p>({data?.totalQuantity > 0 ? data.totalQuantity : "0"})</p>
          </button>
        </nav>

        {/* mobile nav */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => onOpen("menu")}
          aria-label="Open menu"
        >
          <CiMenuBurger size={18} />
        </button>
      </div>
      <MenuModal collections={collections} />
    </header>
  );
}

export default Header;
