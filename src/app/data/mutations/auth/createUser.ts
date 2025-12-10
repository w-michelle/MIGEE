/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { shopifyFetch } from "@/lib/shopify";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { user } from "@/db/schema";

type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

const SIGNUP_MUTATION = `
mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
        customerUserErrors { code message field}
        customer { id email acceptsMarketing }
    }
}
`;
const schema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password is required" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    }),
  acceptsMarketing: z.boolean(),
});

export default async function createUser(
  initialState: FormState,
  formData: FormData,
) {
  const parse = schema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    acceptsMarketing:
      formData.get("acceptsMarketing") === "on" ||
      formData.get("acceptsMarketing") === "true",
  });

  console.log("formData", formData);

  if (!parse.success) {
    return {
      message: "Invalid form data",
      issues: parse.error.issues.map((issue) => issue.message),
    };
  }

  const data = parse.data;

  const response = await shopifyFetch(SIGNUP_MUTATION, {
    input: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      acceptsMarketing: data.acceptsMarketing,
    },
  });

  console.log("data is parsed", data);
  console.log("what is response", response.data.customerCreate.customer);

  const errors = response?.data.customerCreate?.customerUserErrors;
  console.log("what are the errors:", errors);
  if (errors?.length > 0) {
    return {
      message: "Account cannot be created at this time",
      issues: errors.map((err: any) => err.message),
    };
  }

  const customer = response.data.customerCreate.customer;

  try {
    await db.insert(user).values({
      email: customer.email,
      shopifyId: customer.id,
      name: data.firstName,
    });
  } catch (error) {
    console.error("Failed to create user", error);
  }

  redirect("/account/login");
}
