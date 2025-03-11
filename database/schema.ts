import { integer, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar("full_name", {length: 255}).notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
});

export const meals = pgTable("meals", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    calories: integer("calories").notNull(),
    protein: integer("protein").notNull(),
    carbs: integer("carbs").notNull(),
    fat: integer("fat").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const favoriteMeals = pgTable("favorite_meals", {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    mealName: varchar("meal_name", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});