/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Color, ProductVariant } from "../../sanity.types";

interface ProductOptionProps {
  activeVariant: ProductVariant;
  variants: ProductVariant[];
  optionSettings?: Array<{
    color: Color | null;
    forOption: string | null;
  }> | null;
  onChangeVariant: (id: any) => void;
}

const ProductOption = ({
  activeVariant,
  variants,
  optionSettings,
  onChangeVariant,
}: ProductOptionProps) => {
  const changeVariant = (id: any) => {
    onChangeVariant(id);
  };
  return (
    <ul className="flex items-center gap-2">
      {variants &&
        variants.map((item, key) => {
          const optColor = optionSettings?.find((settings) => {
            if (!settings.forOption) return null;
            const optColorValue = settings.forOption.split(":")[1];
            return optColorValue === item.variantTitle;
          });
          if (!optColor?.color?.hex) return null;
          return (
            <li
              key={key}
              className={`${activeVariant.variantID === item.variantID ? "border-b border-black" : "border-b border-white"}`}
            >
              <div className="py-1">
                <div
                  onClick={() => changeVariant(item.variantID)}
                  className={`w-5 h-5 `}
                  style={{ backgroundColor: optColor.color.hex }}
                ></div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default ProductOption;
