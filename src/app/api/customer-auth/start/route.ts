import { db } from "@/db";
import { verifier } from "@/db/schema";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

function generateCodeVerifier() {
  return crypto.randomBytes(32).toString("base64url");
}

function generateCodeChallenge(verifier: string) {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}

function generateState() {
  return crypto.randomBytes(16).toString("base64url");
}

export async function generateNonce(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    nonce += characters.charAt(randomIndex);
  }

  return nonce;
}

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID;

    if (!clientId) {
      throw new Error("Missing Client Key");
    }
    // Fetch OpenID configuration
    const openidConfigUrl = `https://${process.env.STOREFRONT_DOMAIN}/.well-known/openid-configuration`;
    const openidResponse = await fetch(openidConfigUrl);

    if (!openidResponse.ok) {
      throw new Error(
        `Failed to fetch OpenID configuration: ${openidResponse.statusText}`,
      );
    }

    const openidConfig = await openidResponse.json();
    const authorizationEndpoint = openidConfig.authorization_endpoint;

    // Generate PKCE parameters
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    const state = generateState();

    //store code verifier in database
    await db.insert(verifier).values({
      state,
      verifier: codeVerifier,
    });

    // Get the callback URL from the request
    const url = new URL(request.url);
    const callbackUrl = `${process.env.APP_URL}/api/customer-auth/callback`;

    // Build authorization URL
    const authUrl = new URL(authorizationEndpoint);
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("redirect_uri", callbackUrl);
    authUrl.searchParams.set("scope", "openid email customer-account-api:full");
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("code_challenge", codeChallenge);
    authUrl.searchParams.set("code_challenge_method", "S256");

    // Redirect customer to the authorization URL - shopify
    return NextResponse.redirect(authUrl.toString());
  } catch (error) {
    console.error("Error generating auth URL:", error);
    // return NextResponse.json(
    //   { error: "An unexpected error occured." },
    //   { status: 500 },
    // );
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        stack:
          process.env.NODE_ENV !== "production" && error instanceof Error
            ? error.stack
            : undefined,
      },
      { status: 500 },
    );
  }
}
