"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { IoAdd } from "react-icons/io5";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import { useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

const Cart = () => {
  const { isCartOpen, openCart, closeCart, cartId } = useCartStore();
  const { data, error, isLoading, mutate } = useCart(cartId);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div>
      <motion.div className="absolute h-full w-full inset-0 bg-white/75 transition-opacity duration-500 ease-in-out">
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.8 }}
              className="ml-auto border-l border-neutral-300 bg-white w-full md:max-w-md h-full overflow-y-auto"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="flex items-start justify-between">
                  <h2 className="text-xs text-neutral-700">Shopping cart</h2>
                  <button
                    onClick={() => closeCart()}
                    className="text-gray-700 cursor-pointer"
                  >
                    <TfiClose size={14} />
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
                        <div className="flex flex-col items-start space-y-3 text-sm ml-4 w-full">
                          <div className="flex items-center text-xs justify-between w-full">
                            <h3 className=" text-xs">Sun Necklace</h3>
                            <p className="text-neutral-400 font-bold tracking-wider">
                              110 CAD
                            </p>
                          </div>
                          <div className="mt-3">
                            <p className="text-xs"> Gold</p>
                          </div>

                          <div className="mt-2 flex items-center">
                            <div className="p-0.5 flex items-center justify-center">
                              <HiOutlineMinusSmall
                                // onClick={() => increaseItem(item)}
                                className="size-3 hover:cursor-pointer"
                                title="Increase Quantity"
                                aria-label="Increase Quantity"
                              />
                            </div>
                            <div className="py-0.5 px-4 w-full text-xs text-center">
                              1
                            </div>
                            <div className="p-0.5 flex items-center justify-center">
                              <IoAdd
                                // onClick={() => decreaseItem(item)}
                                className="size-3 text-[14px] hover:cursor-pointer"
                                title="Decrease Quantity"
                                aria-label="Decrease Quantity"
                              />
                            </div>
                          </div>
                          <button className="text-[10px] text-neutral-500 cursor-pointer hover:font-bold">
                            REMOVE
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* bottom */}
                <div className="mt-auto">
                  <div className="flex justify-between">
                    <p className="text-sm">TOTAL</p>
                    <p className="text-xl">110 CAD</p>
                  </div>
                  <button className="py-4 mt-8 w-full bg-neutral-800 text-white text-sm">
                    VIEW BAG
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Cart;
