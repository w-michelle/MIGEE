"use client";

import { useState } from "react";

function Return() {
  const [email, setEmail] = useState("");
  const [orderNo, setOrderNo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = "customercare@migee.com";
    const subject = encodeURIComponent("Return Request");
    const body = encodeURIComponent(
      `Hello,\n\nI would like to request a return.\n\nEmail: ${email}\nOrder Number: ${orderNo}\n\nThank you`,
    );
    console.log(
      `Hello,\n\nI would like to request a return.\n\nEmail: ${email}\nOrder Number: ${orderNo}\n\nThank you`,
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <main className=" h-screen flex flex-col items-center">
      <div className="w-2/3 md:w-1/2 mt-20">
        <h1 className="text-center mb-14">Return Form</h1>
        <div>
          <p className="text-xs mb-14">
            To submit your return request, please complete the form on the
            following page. You will receive an email confirming your request,
            and a member of our Customer care team will sent you a unique
            authorization number together with return instructions.
          </p>
        </div>
        {/* form */}
        <section className=" w-full flex flex-col items-center">
          <h2 className="text-sm mb-10">
            Please enter your email and order number:
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full"
          >
            <div className="relative">
              <input
                type="email"
                required
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm peer w-full transition py-2 outline-none border-b border-gray-400"
              />
              <label
                className="
                 absolute top-3 left-0
                origin-[0]
                transform
                duration-500 
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-8
                peer-focus: text-gray-400
                peer-not-placeholder-shown:-translate-y-8
                peer-not-placeholder-shown:scale-75
                text-xs"
              >
                Email
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                required
                placeholder=" "
                value={orderNo}
                onChange={(e) => setOrderNo(e.target.value)}
                className="text-sm peer w-full transition py-2 outline-none border-b border-gray-400"
              />
              <label
                className="
                absolute top-3 left-0
                origin-[0]
                transform
                duration-500 
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-8
                peer-focus: text-gray-400
                peer-not-placeholder-shown:-translate-y-8
                peer-not-placeholder-shown:scale-75
                text-xs"
              >
                Order Number:
              </label>
            </div>
            <button
              type="submit"
              className="cursor-pointer bg-black hover:bg-black/70 py-2 text-white text-xs"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Return;
