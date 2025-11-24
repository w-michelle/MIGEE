"use client";
import Image from "next/image";
import Form from "next/form";
import { LuUserRound } from "react-icons/lu";
import { LuShoppingBag } from "react-icons/lu";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

function Header() {
  const { toggleCart } = useCartStore();

  return (
    <header>
      <div className="flex items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="relative w-[150px] h-20 cursor-pointer">
              <Image
                src="/migeeLogo.png"
                alt="Logo"
                fill
              />
            </div>
          </Link>
          <nav className="flex gap-2">
            <div>New</div>
            <div>Bags</div>
            <div>Accessories</div>
          </nav>
        </div>
        <div>
          <Form
            action="/search"
            className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
          >
            <input
              type="text"
              name="query"
              placeholder="Search for products"
              className="bg-gray-100 text-gray-800 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
            />
          </Form>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/account">
            <LuUserRound size={22} />
          </Link>
          <button
            onClick={() => toggleCart()}
            className="cursor-pointer"
          >
            <LuShoppingBag size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
