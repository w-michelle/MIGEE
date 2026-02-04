import { removeCartLine } from "@/app/data/mutations/cart/cart";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { cartId, lineId } = await req.json();

    if (!cartId || !lineId) {
      return NextResponse.json(
        { message: "Missing cartId or lineId" },
        { status: 400 },
      );
    }
    const data = await removeCartLine({ cartId, lineId });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return NextResponse.json(
      { message: "Failed to remove item from cart" },
      { status: 500 },
    );
  }
}
