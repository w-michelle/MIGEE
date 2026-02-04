import Marquee from "react-fast-marquee";

export const FooterReassurance = () => {
  const reassuranceList = [
    {
      title: "Easy Returns",
      desc: "Changed your mind? Easily return your purchase via mail.",
    },
    {
      title: "Free shipping",
      desc: "Free delivery for orders over CAD $115",
    },
    {
      title: "Secure payment",
      desc: "Visa, Mastercard, Paypal, American express",
    },
  ];

  return (
    <section className="mt-2 border-t border-neutral-400 ">
      <div className="hidden md:flex justify-around py-30">
        {reassuranceList.map((item) => (
          <div
            key={item.title}
            className="text-center text-md"
          >
            <h2>{item.title}</h2>
            <p className="text-xs text-neutral-400 mt-6">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="md:hidden">
        <Marquee
          speed={30}
          direction="left"
          className="full bg-black py-2"
          autoFill
        >
          {reassuranceList.map((item) => (
            <span
              key={item.title}
              className="text-center text-sm text-white mr-10"
            >
              {item.title}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
