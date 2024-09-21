import { pgTable, serial, timestamp, varchar, json, integer } from "drizzle-orm/pg-core";
import { apiProjects, apiSections } from ".";

export const apiEndpoints = pgTable('api-endpoints', {
  id: serial("id").primaryKey(),
  sectionId: integer('section_id').references(() => apiSections.id).notNull(),
  projectId: integer('project_id').references(() => apiProjects.id).notNull(),
  title: varchar('title', { length: 250 }).notNull(),
  slug: varchar('slug', { length: 260 }).notNull(),
  body: json("body"),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type ApiEndpointsType = typeof apiEndpoints.$inferInsert;