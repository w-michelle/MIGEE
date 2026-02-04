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
  inventory: Array<{
    id: number;
    inStock: boolean;
    lowStock: number;
    outOfStock: boolean;
  }>;
}

const ProductOption = ({
  activeVariant,
  variants,
  optionSettings,
  onChangeVariant,
  inventory,
}: ProductOptionProps) => {
  const changeVariant = (id: any) => {
    onChangeVariant(id);
  };

  const inventoryForActiveVariant = inventory.find(
    (v) => v.id === activeVariant.variantID,
  );

  return (
    <div>
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
                className={`${activeVariant.variantID === item.variantID ? "border px-1 border-black" : "border-b border-white"} cursor-pointer`}
              >
                <div className="py-1 relative">
                  <div
                    onClick={() => changeVariant(item.variantID)}
                    className="relative w-5 h-5 "
                    style={{ backgroundColor: optColor.color.hex }}
                    aria-label={`Select color ${item.variantTitle}`}
                  ></div>
                  {inventoryForActiveVariant?.id === item.variantID &&
                    inventoryForActiveVariant?.outOfStock && (
                      <div className="absolute top-px left-[48%] rounded-md rotate-45  w-px h-[calc(100%-1px)] bg-black"></div>
                    )}
                </div>
              </li>
            );
          })}
      </ul>
      <div
        className="mt-5"
        aria-live="polite"
      >
        {inventoryForActiveVariant?.outOfStock && (
          <p className="text-xs">Out of Stock</p>
        )}

        {inventoryForActiveVariant &&
          inventoryForActiveVariant?.lowStock <= 5 &&
          inventoryForActiveVariant?.lowStock > 0 && (
            <p className="text-xs">Low Stock</p>
          )}
      </div>
    </div>
  );
};

export default ProductOption;
