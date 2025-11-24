"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { IoAdd } from "react-icons/io5";
import { HiOutlineMinusSmall } from "react-icons/hi2";

const Cart = () => {
  const { isCartOpen, openCart, closeCart } = useCartStore();

  if (!isCartOpen) return null;

  return (
    <div className="">
      <div className="absolute h-full w-full inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out">
        <div className="ml-auto bg-white max-w-md h-full overflow-y-auto">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <h2 className="font-bold">MY BAG</h2>
              <button
                onClick={() => closeCart()}
                className="text-gray-700 cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  data-slot="icon"
                  aria-hidden="true"
                  className="size-6"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            {/* cart items */}

            <div className="mt-8 w-full">
              <div className="">
                <ul>
                  <li className="flex py-6">
                    <div className="relative size-32">
                      <Image
                        src="/sun.webp"
                        alt="Audrey Bag"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col space-y-2 text-sm ml-4 w-full">
                      <div>
                        <h3 className="font-bold">Sun Necklace</h3>
                        <p>$110</p>
                      </div>
                      <div>
                        <p className="text-xs"> Gold</p>
                      </div>
                      <div>
                        <p className="text-xs">Quantity</p>
                        <div className="mt-2 flex justify-between items-center w-full">
                          <div className="flex">
                            <div className="p-0.5 border flex items-center justify-center bg-gray-100">
                              <HiOutlineMinusSmall
                                // onClick={() => increaseItem(item)}
                                className="size-4 hover:cursor-pointer"
                                title="Increase Quantity"
                                aria-label="Increase Quantity"
                              />
                            </div>
                            <div className="border-t border-b py-0.5 px-4 w-full text-center">
                              1
                            </div>
                            <div className="p-0.5 border flex items-center justify-center">
                              <IoAdd
                                // onClick={() => decreaseItem(item)}
                                className="size-4 text-[14px] hover:cursor-pointer"
                                title="Decrease Quantity"
                                aria-label="Decrease Quantity"
                              />
                            </div>
                          </div>

                          <button className="text-xs cursor-pointer hover:font-bold">
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <hr className="border-gray-300" />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
