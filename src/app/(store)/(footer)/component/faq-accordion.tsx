/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import PortableTextBlock from "@/components/PortableText";

export const FaqAccordion = ({ item }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li
      key={item.title}
      className="border-b py-6 text-gray-800"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm">{item.title}</h3>
        {isOpen ? (
          <motion.div
            onClick={() => setIsOpen(false)}
            className="cursor-pointer"
          >
            <RxCaretUp />
          </motion.div>
        ) : (
          <motion.div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer"
          >
            <RxCaretDown />
          </motion.div>
        )}
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className={`flex flex-col gap-3 mt-5 text-xs text-neutral-500`}
            >
              <PortableTextBlock value={item.content} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
