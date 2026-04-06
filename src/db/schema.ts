import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  shopifyId: text("shopify_id"),
  customerAccessToken: text("customer_access_token"),
  cartId: text("cart_id"),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verifier = pgTable("verifier", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  state: text("state").notNull().unique(),
  verifier: text("verifier").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const customerAccessToken = pgTable(
  "customer_access_token",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").references(() => user.id, {
      onDelete: "cascade",
    }),
    shop: text("shop").notNull(),
    accessToken: text("accessToken").notNull(),
    idToken: text("id_token"),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).$defaultFn(
      () => /* @__PURE__ */ new Date(),
    ),
  },
  (table) => [
    index("customer_access_token_shop_idx").on(table.shop),
    index("customer_access_token_user_idx").on(table.userId),
  ],
);
