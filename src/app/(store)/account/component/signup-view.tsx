"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Input } from "./Input";
import { FiAlertOctagon } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import createUser from "@/app/data/mutations/auth/createUser";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  password: z.string().min(1, { message: "Password is required" }),
  acceptsMarketing: z.boolean(),
});

const SignUpView = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      acceptsMarketing: true,
    },
  });

  const acceptsMarketing = watch("acceptsMarketing");
  const initialState = {
    message: "",
    issues: [],
  };

  const [state, formAction, isPending] = useActionState(
    createUser,
    initialState,
  );

  return (
    <div className="p-8 rounded-lg">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">NEW HERE?</h1>
        <p>Create and account to save your purchase information</p>
        <div className="text-center text-sm">
          Have an account?{" "}
          <Link
            href="/account/login"
            className="underline underline-offset-4 hover:text-black"
          >
            Sign In
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <form
          action={formAction}
          className="flex flex-col gap-4"
        >
          <Input
            type="text"
            label="First Name"
            placeholder="First Name"
            id="firstName"
            disabled={isPending}
            register={register("firstName")}
          />
          <Input
            type="text"
            label="Last Name"
            placeholder="Last Name"
            id="lastName"
            disabled={isPending}
            register={register("lastName")}
          />
          <Input
            type="email"
            label="Email"
            placeholder="Email"
            id="email"
            disabled={isPending}
            register={register("email")}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Password"
            id="password"
            disabled={isPending}
            register={register("password")}
          />
          {state?.issues && (
            <div className="text-red-500">
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
          <div className="flex items-center gap-2 justify-center w-full border-1">
            <input
              {...register("acceptsMarketing", {
                setValueAs: (v) => Boolean(v),
              })}
              type="checkbox"
              id="acceptsMarketing"
              disabled={isPending}
              className="accent-amber-950"
              checked={acceptsMarketing}
            />
            <label className="text-sm">SUBSCRIBE TO OUR NEWSLETTER</label>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`text-white w-full font-bold bg-amber-950 py-3 px-3 rounded-md hover:bg-neutral-900 hover:cursor-pointer`}
          >
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpView;
