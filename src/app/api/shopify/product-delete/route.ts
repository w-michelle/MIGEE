import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import crypto from "crypto";
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();

    const body = JSON.parse(rawBody);

    const hmac = request.headers.get("x-shopify-hmac-sha256");

    if (!hmac) {
      return NextResponse.json(
        { error: "Missing HMAC signature" },
        { status: 401 },
      );
    }

    const generatedHash = crypto
      .createHmac("sha256", process.env.SHOPIFY_WEBHOOK_INTEGRITY!)
      .update(rawBody, "utf8")
      .digest("base64");

    if (hmac !== generatedHash) {
      console.error("Invalid HMAC signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const { id, title } = body;

    /**
 * Begin sanity sync
 
 */

    console.log(`Deleteing product from Sanity: ${title} (id: ${id})`);
    let stx = sanity.transaction();

    //patch (update product document with core shopify data)
    stx = stx.patch(`product-${id}`, (patch) =>
      patch.set({ wasDeleted: true }),
    );

    const result = await stx.commit();

    console.info("Sync complete!");
    console.log(result);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
