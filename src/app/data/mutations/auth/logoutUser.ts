"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logoutUser() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "customerAccessToken",
    value: "",
    maxAge: 0,
    path: "/",
  });
  revalidatePath("/");
  redirect("/");
}
