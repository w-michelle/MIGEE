import {
  attachCartToCustomer,
  getCustomer,
} from "@/app/data/mutations/cart/cart";
import { db } from "@/db";
import { customerAccessToken, user, verifier } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID;

    if (!clientId) {
      throw new Error("Missing client key");
    }

    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code || !state) {
      throw new Error("Missing code or state parameter");
    }

    const codeVerifierRecord = await db.query.verifier.findFirst({
      where: eq(verifier.state, state),
    });

    if (!codeVerifierRecord) {
      throw new Error("Invalid state paramenter or code verifier not found");
    }

    // Fetch OpenID configuration to get token endpoint
    const openidConfigUrl = `https://${process.env.STOREFRONT_DOMAIN}/.well-known/openid-configuration`;
    const openidResponse = await fetch(openidConfigUrl);

    if (!openidResponse.ok) {
      throw new Error(
        `Failed to fetch OpenID configuration: ${openidResponse.statusText}`,
      );
    }

    const openidConfig = await openidResponse.json();
    const tokenEndpoint = openidConfig.token_endpoint;

    // Get callback URL
    const callbackUrl = `${process.env.APP_URL}/api/customer-auth/callback`;

    // Exchange authorization code for access token
    const tokenResponse = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        redirect_uri: callbackUrl,
        code: code,
        code_verifier: codeVerifierRecord.verifier,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(
        `Token exchange failed: ${tokenResponse.statusText} - ${errorText}`,
      );
    }

    const tokenData = await tokenResponse.json();

    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error(
        "Token exchange succeeded but no access_token was returned",
      );
    }

    // Calculate token expiration
    const expiresAt = tokenData.expires_in
      ? new Date(Date.now() + tokenData.expires_in * 1000)
      : null;

    // Clean up the used code verifier

    await db.delete(verifier).where(eq(verifier.state, state));

    //Fetch customer profile
    const apiDiscovery = await fetch(
      `https://${process.env.STOREFRONT_DOMAIN}/.well-known/customer-account-api`,
    ).then((res) => res.json());

    const customerResult = await fetch(apiDiscovery.graphql_api, {
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
                emailAddress{
                    emailAddress
                }
            }
            
            }
            `,
      }),
    }).then((r) => r.json());

    const customer = customerResult?.data?.customer;
    const email = customer?.emailAddress?.emailAddress;
    const customerId = customer?.id; //shopify customer id

    //Check if customer doesnt exist in db
    const existingCustomer = await getCustomer(customerId);
    const cartId = request.cookies.get("cartId")?.value || null;

    let insertedUser = existingCustomer;

    //#1 check if customer exist in db, if not create new with new cartid & access token
    //else if customer exist update it with new login accesstoken
    if (existingCustomer.length == 0) {
      //Store user to database
      const newCustomer = await db
        .insert(user)
        .values({
          email: email,
          shopifyId: customerId,
          customerAccessToken: accessToken,
          cartId: cartId,
        })
        .returning();

      insertedUser = newCustomer;
      // Store the access token in the database
      await db
        .insert(customerAccessToken)
        .values({
          shop: process.env.NEXT_PUBLIC_BASE_URL!,
          accessToken: accessToken,
          idToken: tokenData.id_token,
          userId: insertedUser[0].id,
          expiresAt,
        })
        .returning();
    } else {
      await db
        .update(user)
        .set({ email: email, customerAccessToken: accessToken })
        .where(eq(user.id, insertedUser[0].id));
    }

    //#2 Update existing customer's customer access token on db. new customer's already added upon creation above
    if (existingCustomer.length !== 0) {
      const existingTokenRecord = await db.query.customerAccessToken.findFirst({
        where: eq(customerAccessToken.userId, existingCustomer[0].id),
      });

      if (existingTokenRecord) {
        await db
          .update(customerAccessToken)
          .set({
            accessToken,
            idToken: tokenData.id_token ?? null,
            expiresAt,
            shop: process.env.NEXT_PUBLIC_BASE_URL!,
          })
          .where(eq(customerAccessToken.userId, existingCustomer[0].id));
      } else {
        await db.insert(customerAccessToken).values({
          shop: process.env.NEXT_PUBLIC_BASE_URL!,
          accessToken,
          idToken: tokenData.id_token ?? null,
          userId: existingCustomer[0].id,
          expiresAt,
        });
      }
    }

    const response = NextResponse.redirect(`${process.env.APP_URL}/account`);

    //#3 CARTID - If customer exists in db and has cartid set it to cookie, if not update db with new cartId and set cookie
    //new customer's cart added above upon creation
    if (existingCustomer.length !== 0 && existingCustomer?.[0]?.cartId) {
      //customer has cartid so update it with new accesstoken from login
      await attachCartToCustomer(existingCustomer[0].cartId, accessToken);
      response.cookies.set("cartId", existingCustomer[0].cartId);
    } else if (cartId) {
      //customer doesnt have cartid, attach new cartid to new accesstoken
      await attachCartToCustomer(cartId, accessToken);
      //update customer with a cartid on db
      await db
        .update(user)
        .set({ cartId })
        .where(eq(user.id, insertedUser[0].id));
      response.cookies.set("cartId", cartId);
    }

    // Store tokenId in session cookie and redirect to order list

    response.cookies.set({
      name: "customerAccessToken",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    response.cookies.set({
      name: "customerIdToken",
      value: tokenData.id_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in callback:", error);

    return NextResponse.json(
      { error: "An error occured during authentication" },
      { status: 500 },
    );
  }
}
