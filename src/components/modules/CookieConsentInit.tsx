"use client";
import { initCookieConsent } from "@/lib/cookieConsent";
import { useEffect } from "react";

export default function CookieConsentInit() {
  useEffect(() => {
    initCookieConsent();
  }, []);

  return null;
}
