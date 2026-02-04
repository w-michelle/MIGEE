import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import CartInitialize from "@/components/CartInitialize";
import Cart from "@/components/Cart";
import Banner from "@/components/Banner";
import { Footer } from "@/components/Footer";
import { getAllCollections } from "@/sanity/lib/products/getAllCollections";
import { SanityLive } from "@/sanity/lib/live";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ??
  "https://arriving-man-moderately.ngrok-free.app";

export const metadata: Metadata = {
  title: {
    template: "%s | MIGEE",
    default: "MIGEE | Handbags & Accessories",
  },
  description:
    "Timeless everyday handbags and accessories for modern, effortless style",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "MIGEE",
    description:
      "Discover our curated collection of handbags and accessories – perfect for everyday.",
    images: [
      {
        url: `${baseUrl}/share-migee.png`,
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MIGEE",
    description:
      "Discover our curated collection of handbags and accessories – perfect for everyday.",
    images: `${baseUrl}/share-migee.png`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collections = await getAllCollections();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
        <div className="flex-1 text-gray-800">
          <Banner />
          <Header collections={collections} />

          {/*hydrate zustand  */}
          <CartInitialize />

          {children}
        </div>
        <Cart />

        <Footer />

        {/* cookie consent */}
        {/* <CookieConsentInit /> */}
        <SanityLive />
      </body>
    </html>
  );
}
