"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Input } from "./Input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import loginUser from "@/app/data/mutations/auth/loginUser";
import { FiAlertOctagon } from "react-icons/fi";
const SignInView = () => {
  const [pending, setPending] = useState(false);

  const formSchema = z.object({
    email: z.email(),
    password: z.string().min(1, { message: "Password is required" }),
  });

  const {
    register,

    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const initialState = {
    message: "",
    issues: [],
    data: { email: "", password: "" },
  };

  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState,
  );

  return (
    <div className="p-8 flex-1 w-full ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Welcome Back</h1>
        <p>Login to Your Account</p>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/account/register"
            className="underline underline-offset-4 hover:text-black"
          >
            Register
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <form
          action={formAction}
          className="flex flex-col gap-4"
        >
          <Input
            type="email"
            label="Email"
            placeholder="Email"
            id="email"
            defaultValue={state.data?.email}
            disabled={isPending}
            register={register("email")}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Password"
            id="password"
            defaultValue={state.data?.password || ""}
            disabled={isPending}
            register={register("password")}
          />
          {state?.issues && (
            <div
              className="text-red-500"
              role="alert"
              aria-live="assertive"
            >
              <ul>
                {state.issues.map((issue: string) => (
                  <li
                    key={issue}
                    className="flex items-center gap-1 text-sm text-red-400"
                  >
                    <FiAlertOctagon />
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className={`text-white text-sm w-full font-bold bg-amber-950 py-3 px-3 rounded-md hover:bg-neutral-900 hover:cursor-pointer`}
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInView;
