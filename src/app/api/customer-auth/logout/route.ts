import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const idToken = cookieStore.get("customerIdToken")?.value;

  const openid = await fetch(
    `https://${process.env.STOREFRONT_DOMAIN}/.well-known/openid-configuration`,
  ).then((res) => res.json());

  if (!idToken) {
    const res = NextResponse.redirect(`${process.env.APP_URL}`);
    res.cookies.delete("customerAccessToken");
    res.cookies.delete("customerIdToken");
    return res;
  }

  const logoutUrl = new URL(openid.end_session_endpoint);
  logoutUrl.searchParams.set("id_token_hint", idToken);
  logoutUrl.searchParams.set(
    "post_logout_redirect_uri",
    `${process.env.APP_URL}`,
  );

  const res = NextResponse.redirect(logoutUrl.toString(), { status: 303 });
  res.cookies.delete("customerAccessToken");
  res.cookies.delete("customerIdToken");
  res.cookies.delete("cartId");

  return res;
}
