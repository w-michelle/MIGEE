"use client";
import { useModal } from "@/store/useModal";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { PiUserLight } from "react-icons/pi";
import { TfiClose } from "react-icons/tfi";
import { CiChat1 } from "react-icons/ci";
import { GoDot, GoDotFill } from "react-icons/go";

const MenuModal = () => {
  const { openModal, onClose } = useModal();

  const isMenuOpen = openModal === "menu";

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
  if (openModal !== "menu") return null;
  return (
    <div className="absolute text-neutral-700 inset-0 w-full h-full overflow-hidden bg-white z-10">
      <div className="h-full flex flex-col">
        <div className="flex justify-between px-4 py-4">
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
          <button
            onClick={() => onClose()}
            className="text-gray-700 cursor-pointer"
          >
            <TfiClose size={14} />
          </button>
        </div>

        <div className="flex flex-col h-full mt-12">
          {/* nav */}
          <nav className="mb-6">
            <ul>
              <li className="border-b border-gray-300 p-4 w-full">
                <Link href="/">Sales</Link>
              </li>
              <li className="border-b border-gray-200 p-4 w-full">
                <Link href="/">New In</Link>
              </li>
              <li className="border-b border-gray-200 p-4 w-full">
                <Link href="/">Bags</Link>
              </li>
              <li className="border-b border-gray-200 p-4 w-full">
                <Link href="/">Charms</Link>
              </li>
            </ul>
          </nav>

          <div className="text-xs space-y-6 px-4 pb-14 mt-auto">
            <button className="flex items-center gap-4">
              <GoDotFill size={14} />
              <span>Shopping cart</span>
            </button>

            <Link
              href="/account"
              className="flex gap-4"
            >
              <PiUserLight size={14} />
              <p>Account</p>
            </Link>
            <Link
              href="/"
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
