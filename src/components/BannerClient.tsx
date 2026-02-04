/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

interface BannerProps {
  enabled: boolean;
  text: string;
}

export function BannerClient({ promo }: { promo: BannerProps[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % promo.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [promo.length]);

  return (
    <div className="animate-fade bg-black text-xs text-center text-white px-6 py-1 shadow-lg">
      {promo[index].text}
    </div>
  );
}
