/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { imageUrl } from "@/lib/imageUrl";
import { PortableText } from "@portabletext/react";
import { a } from "motion/react-client";
import Link from "next/link";

const components = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-2xl font-bold mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl font-semibold mb-3">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg font-semibold mb-2">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-sm font-medium mb-2">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-sm mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    underline: ({ children }: any) => (
      <span className="underline">{children}</span>
    ),
    link: ({ value, children }: any) => {
      const href = value?.href;
      if (href?.startsWith("/")) {
        return <Link href={href}>{children}</Link>;
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-4 text-sm">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
  },

  types: {
    image: ({ value }: any) => (
      <div>
        <img
          src={imageUrl(value.asset._ref).url()}
          alt={value.alt || ""}
          className="my-6 w-full aspect-square md:w-1/2"
        />
      </div>
    ),
  },
};

export default function PortableTextBlock({ value }: { value: any }) {
  if (!value) return null;
  return (
    <PortableText
      value={value}
      components={components}
    />
  );
}
