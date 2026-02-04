/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { shopifyFetch } from "@/lib/shopify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { custom, z } from "zod";
import { cookies } from "next/headers";
import { attachCartToCustomer, getCustomerCart } from "../cart/cart";
import { db } from "@/db";
import { user } from "@/db/schema";

type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

async function setAuthToken(token: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: "customerAccessToken",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

const LOGIN_MUTATION = `
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { code message field}
    }
}
`;

const schema = z.object({
  email: z.email(),
  password: z.string().min(8, { message: "Your password is incorrect" }),
});

export default async function loginUser(
  initialState: FormState,
  formData: FormData,
) {
  const parse = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parse.success) {
    return {
      message: "You have entered an invalid email or password",
      issues: parse.error.issues.map((issue) => issue.message),
      data: {
        email: (formData.get("email") as string) ?? "",
        password: (formData.get("password") as string) ?? "",
      },
    };
  }

  const data = parse.data;

  const response = await shopifyFetch(LOGIN_MUTATION, {
    input: { email: data.email, password: data.password },
  });

  const errors = response?.data.customerAccessTokenCreate?.customerUserErrors;
  const token =
    response?.data.customerAccessTokenCreate?.customerAccessToken?.accessToken;

  if (errors?.length > 0) {
    return {
      message: "User cannot be found",
      issues: errors.map((err: any) => "Email or password is incorrect"),
      data: data,
    };
  }

  await setAuthToken(token);

  //attach anonymous cart to customer
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value || null;

  // check if customer has cart set to cookie
  const existingCustomer = await getCustomerCart(data.email);

  if (existingCustomer[0].cartId) {
    cookieStore.set("cartId", existingCustomer[0].cartId, { path: "/" });
    //set it to zustands
  } else if (cartId) {
    //customer doesnt have cart

    //attach guest cart to customer using buyerIdentity
    await attachCartToCustomer(cartId, token);

    //update new cartId for user in db
    await db.update(user).set({
      cartId: cartId,
    });
  }
  revalidatePath("/");

  redirect("/");
}
