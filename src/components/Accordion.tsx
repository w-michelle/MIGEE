import Link from "next/link";
import { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
type PageProp = {
  slug: string;
  title: string;
};
const Accordion = ({ data, name }: { data: PageProp[]; name: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="border-b px-6 py-6 text-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm">{name}</h3>
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
            <ul className={`flex flex-col gap-3 mt-5 text-xs text-neutral-500`}>
              {data.map((page: PageProp) => (
                <li key={page.title}>
                  <Link href={page.slug}>{page.title}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
export default Accordion;
