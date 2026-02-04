import Link from "next/link";

export const Contact = () => {
  return (
    <div className="flex-1 px-8 py-12">
      <h2 className="text-sm md:text-lg ">Need help? Contact us</h2>
      <div className="text-neutral-400 text-xs mt-4">
        <p>Monday to Friday from 10:00am to 6:00pm EST.</p>
        <p>Saturdays from 11:00am to 5:00pm EST.</p>
      </div>
      <div className="text-xs flex gap-6 mt-8">
        <Link
          href="/company/contact-us"
          className="underline"
        >
          Contact Us
        </Link>
        <Link
          href="/return-form"
          className="underline"
        >
          Register a return
        </Link>
      </div>
    </div>
  );
};
