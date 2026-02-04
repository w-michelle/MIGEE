import { updateCartLine } from "@/app/data/mutations/cart/cart";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cartId, lineId, quantity } = await req.json();

    if (!cartId || !lineId) {
      return NextResponse.json(
        { message: "Missing cartId or lineId" },
        { status: 400 },
      );
    }

    const data = await updateCartLine({ cartId, lineId, quantity });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Update to cart error:", error);
    return NextResponse.json(
      { message: "Failed to update item to cart" },
      { status: 500 },
    );
  }
}
