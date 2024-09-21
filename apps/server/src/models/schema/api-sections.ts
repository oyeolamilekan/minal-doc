import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { apiProjects } from ".";

export const apiSections = pgTable('api-sections', {
  id: serial("id").primaryKey(),
  projectId: integer('project_id').references(() => apiProjects.id).notNull(),
  title: varchar('title', { length: 250 }).notNull(),
  slug: varchar('slug', { length: 250 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type ApiSectionsType = typeof apiSections.$inferInsert;