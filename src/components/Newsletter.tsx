"use client";

import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"loading" | "subscribed" | "error" | "">(
    "",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/klaviyo/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Subscription failed");

      setStatus("subscribed");
      setEmail("");

      setTimeout(() => {
        setStatus("");
      }, 3000);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className=" py-12 md:border-r md:border-b-0 border-b border-neutral-400 flex-1">
      <div className="mx-8">
        <div className="max-w-[400px]">
          <h2 className="text-sm md:text-lg md:font-bold md:mb-4">
            Subscribe to the newsletter
          </h2>
          <p className="hidden text-sm md:block">
            Subscribe to receive all the information by email on our latest
            collections, our products and our special offers.
          </p>
        </div>
        <div className="relative mt-14 mb-8 max-w-[400px] flex items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full"
          >
            <div className="flex w-full border-b">
              <label
                htmlFor="newsletter-email"
                className="sr-only"
              ></label>
              <input
                type="email"
                id="newsletter-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="peer w-full transition py-2 outline-none"
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                disabled={status === "loading"}
                className={`${email ? "opacity-100" : "opacity-0"} cursor-pointer`}
              >
                <BsArrowRight />
              </button>
            </div>
            <div
              className="mt-2"
              aria-live="polite"
            >
              {status === "loading" && <div>Loading...</div>}
              {status === "subscribed" && <p>Subscribed !</p>}
              {status === "error" && <p>Try again</p>}
            </div>
          </form>
        </div>
        <p className="text-xs text-neutral-400 max-w-[400px]">
          I agree to receive the MIGEE newsletter to be the first to know about
          new collections, exclusive product launches, events and services
          available. By subscribing I agree to the MIGEE Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
