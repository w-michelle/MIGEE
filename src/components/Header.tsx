"use client";
import Image from "next/image";
import Form from "next/form";

import { PiUserLight } from "react-icons/pi";
import { CiMenuBurger, CiSearch, CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import * as motion from "motion/react-client";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

import { useModal } from "@/store/useModal";
function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const { toggleCart } = useCartStore();
  const { onOpen } = useModal();

  return (
    <header className="px-8 py-4">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <Link href="/">
            <div className="relative w-[110px] h-10 cursor-pointer">
              <Image
                src="/migee.png"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
          </Link>
          <nav className="hidden md:flex gap-10 my-4 text-sm">
            <Link
              href="/new"
              className="cursor-pointer"
            >
              New
            </Link>
            <Link
              href="/bags"
              className="cursor-pointer"
            >
              Bags
            </Link>
            <div>Accessories</div>
          </nav>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex">
            <AnimatePresence initial={false}>
              <motion.button
                className=""
                whileTap={{ y: 1 }}
                onClick={() => setIsVisible(!isVisible)}
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
                  >
                    <input
                      type="text"
                      name="query"
                      placeholder="Search for products"
                      className=" text-gray-800 px-2 py-1 focus:outline-none border-b w-full max-w-4xl"
                    />
                  </Form>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <Link href="/account">
            <PiUserLight size={18} />
          </Link>
          <button
            onClick={() => toggleCart()}
            className="cursor-pointer"
          >
            <CiShoppingCart size={18} />
          </button>
          {/* mobile nav */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => onOpen("menu")}
          >
            <CiMenuBurger size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
