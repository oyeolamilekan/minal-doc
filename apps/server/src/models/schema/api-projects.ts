import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const apiProjects = pgTable('api-projects', {
  id: serial("id").primaryKey(),
  title: varchar('title', { length: 250 }).notNull(),
  description: text('description'),
  slug: varchar('slug', { length: 250 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const selectAPIProjectSchema = createSelectSchema(apiProjects);

export const newAPIProjectSchema = z.object({
  body: selectAPIProjectSchema.pick({
    title: true,
    description: true,
  }),
});

export const updateAPIProjectSchema = z.object({
  body: selectAPIProjectSchema
    .pick({
      title: true,
      description: true,
    })
    .partial(),
});

export type ApiProjectsType = typeof apiProjects.$inferInsert;
export type NewAPIProjectSchema = z.infer<typeof newAPIProjectSchema>['body'];
export type UpdateAPIProjectSchema = z.infer<typeof updateAPIProjectSchema>['body'];