import { customerAccessToken } from "./../../../../db/schema";
import { getCustomerTokenId } from "@/lib/customer-session";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const tokenId = await getCustomerTokenId();

  if (!tokenId) throw new Error("Not authenticated");

  const tokenRecord = await db.query.customerAccessToken.findFirst({
    where: eq(customerAccessToken.accessToken, tokenId),
  });

  if (!tokenRecord) throw new Error("Access token not found");

  const accessToken = tokenRecord.accessToken;

  // Fetch Customer Account API configuration
  const wellKnownUrl = `https://${process.env.STOREFRONT_DOMAIN}/.well-known/customer-account-api`;
  const wellKnownResponse = await fetch(wellKnownUrl);

  const wellKnownConfig = await wellKnownResponse.json();

  const response = await fetch(wellKnownConfig.graphql_api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({
      query: `
        query {
                  customer {
                    id
                    emailAddress {
                      emailAddress
                    }
                    firstName
                    lastName
                    orders(first: 10) {
                      edges {
                        node {
                          id
                          name
                        }
                      }
                    }
                  }
                }
        `,
    }),
    cache: "no-store",
  });

  const data = await response.json();
  return NextResponse.json(data);
}
