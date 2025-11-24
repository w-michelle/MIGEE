"use server";

import { shopifyFetch } from "@/lib/shopify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { cookies } from "next/headers";

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
mutation Login($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
        customerAccessToken { accessToken expiresAt }
        customerUserErrors { code message field}
    }
}
`;

const schema = z.object({
  email: z.email(),
  password: z.string().min(8, { message: "Password is required" }),
});

export default async function loginUser(
  initialState: FormState,
  formData: FormData,
) {
  console.log("formData", formData);
  const parse = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parse.success) {
    return {
      message: "You have entered an invalid email or password",
      issues: parse.error.issues.map((issue) => issue.message),
    };
  }

  const data = parse.data;

  const response = await shopifyFetch(LOGIN_MUTATION, {
    input: { email: data.email, password: data.password },
  });
  console.log("data is parsed", data);
  console.log("response data", response.data);

  const errors = response?.data.customerAccessTokenCreate?.customerUserErrors;
  const token =
    response?.data.customerAccessTokenCreate?.customerAccessToken?.accessToken;

  if (errors?.length > 0) {
    return {
      message: "User cannot be found",
    };
  }

  console.log("token", token);

  await setAuthToken(token);
  revalidatePath("/");

  redirect("/");
}
