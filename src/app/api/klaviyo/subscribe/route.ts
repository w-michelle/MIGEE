import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const options = {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_PRIVATE_API_KEY}`,
      "content-type": "application/json",
      revision: "2025-10-15",
    },
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email,
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: "SUBSCRIBED",
                      },
                    },
                  },
                },
              },
            ],
          },
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: process.env.KLAVIYO_NEWSLETTER_LIST_ID,
            },
          },
        },
      },
    }),
  };

  const res = await fetch(
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs",
    options,
  );

  if (!res.ok) {
    const error = await res.text();
    console.log("error from api ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
  console.log("success ?", res);

  return NextResponse.json({ success: true });
}
