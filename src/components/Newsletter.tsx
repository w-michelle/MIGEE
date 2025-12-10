const Newsletter = () => {
  return (
    <section className="py-12 border-b">
      <div className="mx-6">
        <div className="max-w-[400px]">
          <h2 className="text-lg font-bold mb-4">
            Subscribe to the newsletter
          </h2>
          <p className="text-sm ">
            Subscribe to receive all the information by email on our latest
            collections, our products and our special offers.
          </p>
        </div>
        <div className="relative mt-14 mb-8 max-w-[400px]">
          <input
            type="text"
            placeholder=" "
            className="peer w-full transition border-b py-2  outline-none"
          />
          <label
            className="
                absolute top-3 left-0
                duration-500 z-10
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-8
                peer-focus: text-gray-500
                text-sm"
          >
            Email
          </label>
        </div>
        <p className="text-xs text-neutral-400 max-w-[400px]">
          I agree to receive the MIGEE newsletter to be the first to know about
          new collections, exclusive product launches, events and services
          available. By subscribing I agree to the MIGEE Privacy Policy
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
