import Link from "next/link";
import "./globals.css";
import Image from "next/image";

export default async function NotFound() {
  return (
    <div className="px-8">
      <h1 className="sr-only">Migee</h1>

      <div className="flex gap-10 py-4">
        <a
          href="https://migee.co"
          aria-label="Migee home"
        >
          <div className="relative w-[130px] h-10 cursor-pointer">
            <Image
              src="/migee.png"
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
        </a>
      </div>
      <h2 className="text-5xl mt-10">404</h2>
      <p className="mt-4">Let&apos;s get you back on track.</p>
      <br />
      <p className="mb-4">
        The link you followed may be broken or the page may have been removed.
      </p>
      <a
        href="https://migee.co"
        className="underline text-black"
      >
        Go Home
      </a>
    </div>
  );
}
