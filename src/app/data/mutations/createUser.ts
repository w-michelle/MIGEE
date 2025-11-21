"use server";

import { shopifyFetch } from "@/lib/shopify";
import { redirect } from "next/navigation";
import { z } from "zod";

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
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  password: z.string().min(1, { message: "Password is required" }),
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
  console.log("what is response", response);

  const errors = response?.data.customerCreate?.customerUserErrors;

  if (errors?.length > 0) {
    return {
      message: "Account cannot be created at this time",
    };
  }
  redirect("/account/login");
}
