CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"shopify_id" text,
	"customer_access_token" text,
	"cart_id" text,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
