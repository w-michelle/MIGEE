/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

export async function getCustomerTokenId() {
  const cookieStore = await cookies();

  const token = cookieStore.get("customerAccessToken")?.value;

  return token ?? null;
}

export async function setCustomerTokenId(tokenId: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "customerAccessToken",
    value: tokenId,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function destroyCustomerSession() {
  const cookieStore = await cookies();
  cookieStore.delete("customerAccessToken");
}
