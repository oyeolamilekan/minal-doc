import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const apiProjects = pgTable('api-projects', {
  id: serial("id").primaryKey(),
  title: varchar('title', { length: 250 }).notNull(),
  description: text('description'),
  slug: varchar('slug', { length: 250 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type ApiProjectsType = typeof apiProjects.$inferInsert;