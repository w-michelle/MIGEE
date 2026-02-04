import { addToCart } from "@/app/data/mutations/cart/cart";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cartId, productID } = await req.json();

    if (!cartId || !productID) {
      return NextResponse.json(
        { message: "Missing cartId or productID" },
        { status: 400 },
      );
    }

    const data = await addToCart({ cartId, productID });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json(
      { message: "Failed to add item to cart" },
      { status: 500 },
    );
  }
}
