/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Link from "next/link";

const Cart = () => {
  const { isCartOpen, openCart, closeCart, cartId } = useCartStore();
  const { data, error, isValidating, mutate } = useCart(cartId);

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

  if (!data) return null;

  const { lines, cost, checkoutUrl, totalQuantity } = data;

  const increaseItem = async (lineId: string, currentQty: number) => {
    if (!cartId) return;

    try {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId,
          lineId,
          quantity: currentQty + 1,
        }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add item");
      }
      mutate();
    } catch (error) {
      console.error("Update cart item failed", error);
    }
  };

  const decreaseItem = async (lineId: string, currentQty: number) => {
    if (!cartId) return;

    try {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId,
          lineId,
          quantity: currentQty - 1,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add item");
      }

      mutate();
    } catch (error) {
      console.error("Update cart item failed", error);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cartId) return;

    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId,
          lineId,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to remove item");
      }

      mutate();
    } catch (error) {
      console.error("Remove cart item failed", error);
    }
  };

  return (
    <div
      className="z-99 h-full"
      role="dialog"
      aria-modal="true"
    >
      <motion.div className="absolute h-full w-full inset-0 bg-white/75 transition-opacity duration-500 ease-in-out ">
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.8 }}
              className="ml-auto border-l border-neutral-300 bg-white w-full md:max-w-md h-full "
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between">
                  <h2 className="text-xs text-neutral-700">Shopping cart</h2>
                  <button
                    type="button"
                    onClick={() => closeCart()}
                    className="text-gray-700 cursor-pointer"
                    aria-label="Close shopping cart"
                  >
                    <TfiClose size={14} />
                  </button>
                </div>
                {/* cart items */}

                <section
                  className="mt-8 pr-2 w-full overflow-y-auto [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-neutral-400
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-neutral-200"
                >
                  <div className="">
                    <ul>
                      {lines.edges.map((item: any) => (
                        <li
                          key={item.node.id}
                          className="flex py-6"
                        >
                          <div className="relative size-32">
                            <Image
                              src={item.node.merchandise.image.url}
                              alt={item.node.merchandise.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col items-start space-y-3 text-sm ml-4 w-full">
                            <div className="flex items-center text-xs justify-between w-full">
                              <Link
                                href={`/product/${item.node.merchandise.product.handle}?variant=${item.node.merchandise.id.split("/").pop()}`}
                                onClick={() => closeCart()}
                                className="text-xs hover:underline"
                              >
                                {item.node.merchandise.product.title}
                              </Link>

                              <p className="text-neutral-400 font-bold tracking-wider">
                                {item.node.merchandise.price.amount} CAD
                              </p>
                            </div>
                            <div className="mt-3">
                              <p className="text-xs">
                                {item.node.merchandise.title}
                              </p>
                            </div>

                            <div className="mt-2 flex items-center">
                              <button
                                type="button"
                                disabled={isValidating}
                                onClick={() =>
                                  decreaseItem(item.node.id, item.node.quantity)
                                }
                                className="p-0.5 flex items-center justify-center"
                                aria-label="Increase Quantity"
                              >
                                <HiOutlineMinusSmall
                                  className="size-3 hover:cursor-pointer"
                                  title="Increase Quantity"
                                />
                              </button>
                              <div
                                aria-live="polite"
                                className="py-0.5 px-4 w-full text-xs text-center"
                              >
                                {item.node.quantity}
                              </div>
                              <button
                                type="button"
                                disabled={isValidating}
                                onClick={() =>
                                  increaseItem(item.node.id, item.node.quantity)
                                }
                                className="p-0.5 flex items-center justify-center"
                                aria-label="Decrease Quantity"
                              >
                                <IoAdd
                                  className="size-3 text-[14px] hover:cursor-pointer"
                                  title="Decrease Quantity"
                                />
                              </button>
                            </div>
                            <button
                              aria-label={`Remove ${item.node.merchandise.product.title} from cart`}
                              disabled={isValidating}
                              onClick={() => removeItem(item.node.id)}
                              className="text-[10px] text-neutral-500 cursor-pointer hover:font-bold"
                            >
                              REMOVE
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* bottom */}
                <div className="mt-auto">
                  {cost.totalAmount.amount > 0 && (
                    <div>
                      <div className="flex justify-between">
                        <p className="text-sm">SUBTOTAL</p>
                        <p className="text-xl">{cost.totalAmount.amount} CAD</p>
                      </div>
                      <button
                        disabled={!checkoutUrl || totalQuantity === 0}
                        aria-disabled={!checkoutUrl || totalQuantity === 0}
                        onClick={() => (window.location.href = checkoutUrl)}
                        className="cursor-pointer py-4 mt-8 w-full bg-neutral-800 text-white text-sm"
                      >
                        CHECKOUT
                      </button>
                    </div>
                  )}
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
