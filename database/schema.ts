import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar("full_name", {length: 255}).notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
});
