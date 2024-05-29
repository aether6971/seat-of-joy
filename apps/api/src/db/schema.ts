import { boolean, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { v4 as uuid } from "uuid";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuid()),
  username: varchar("username", { length: 255 }).unique(),
  email: varchar("email", { length: 255 }).unique(),
  password: text("password"),
  googleId: text("googleId"),
  verified: boolean("verified").$default(() => false),
  locked: boolean("locked").$default(() => false),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
