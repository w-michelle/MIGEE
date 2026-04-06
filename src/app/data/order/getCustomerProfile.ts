import { getCustomerTokenId } from "@/lib/customer-session";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { customerAccessToken } from "@/db/schema";

export async function getCustomerProfile() {
  const tokenId = await getCustomerTokenId();

  if (!tokenId) return null;

  const tokenRecord = await db.query.customerAccessToken.findFirst({
    where: eq(customerAccessToken.accessToken, tokenId),
  });

  if (!tokenRecord) return null;

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
                              processedAt
                              financialStatus
                              fulfillmentStatus
                              totalPrice {
                                amount
                                currencyCode
                              }
                             subtotal {
                                amount 
                                currencyCode
                             }
                            totalTax {
                                amount
                                currencyCode
                            }
                            totalShipping {
                                amount
                                currencyCode
                            }
                            
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
  if (!data?.data.customer) return null;

  return data.data;
}
