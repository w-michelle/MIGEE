import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatPrice";
import { useCartStore } from "@/store/cartStore";
import { IoBagOutline } from "react-icons/io5";

interface ProductActionProps {
  price: number;
  productID: number;
  inventory: Array<{
    id: number;
    inStock: boolean;
    lowStock: number;
    outOfStock: boolean;
  }>;
}

function ProductAction({ price, productID, inventory }: ProductActionProps) {
  const { cartId, openCart } = useCartStore();
  const { mutate } = useCart(cartId);

  if (!productID) return;

  const inventoryForActiveVariant = inventory.find((v) => v.id === productID);

  const addItemToCart = async () => {
    if (!cartId) return;

    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId,
          productID,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to add item");
      }

      mutate();
      openCart();
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };

  return (
    <>
      {inventoryForActiveVariant && inventoryForActiveVariant.outOfStock ? (
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="w-full tracking-widest text-xs py-4 px-6 mb-4 bg-neutral-800 text-white flex items-center justify-between"
        >
          <span className="flex items-center gap-3">Unavailable</span>
          <span>{formatPrice(price!)} CAD</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => addItemToCart()}
          className="w-full cursor-pointer tracking-widest text-xs py-4 px-6 mb-4 bg-neutral-800 hover:bg-neutral-600 text-white flex items-center justify-between"
          aria-label={`Add to cart, ${formatPrice(price!)} Canadian dollars`}
        >
          <span className="flex items-center gap-3">
            <IoBagOutline /> ADD TO CART
          </span>
          <span>{formatPrice(price!)} CAD</span>
        </button>
      )}
    </>
  );
}

export default ProductAction;
