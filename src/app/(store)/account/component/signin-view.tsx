"use client";

const SignInView = () => {
  return (
    <div className="p-20 flex-1 w-full ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Welcome to MIGEE</h1>
        <p className="text-md">Login / Create an account</p>
      </div>
      <div className="mt-6">
        <form
          action="/api/customer-auth/start"
          method="GET"
          className="flex flex-col gap-4"
        >
          <button
            type="submit"
            // disabled={isPending}
            className={`disabled:cursor-not-allowed disabled:bg-neutral-400 text-white text-sm w-full font-bold bg-amber-950 py-3 px-3 rounded-md hover:bg-neutral-900 hover:cursor-pointer`}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInView;
