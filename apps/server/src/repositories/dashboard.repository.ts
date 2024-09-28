import { desc, eq } from 'drizzle-orm';
import { db } from "models"
import { apiProjects, ApiProjectsType, type NewAPIProjectSchema, type UpdateAPIProjectSchema } from "models/schema"
import { slugify } from "utils/app.util"

export const fetchProjects = async () => {
  const projects = await db.select().from(apiProjects).orderBy(desc(apiProjects.createdAt)).limit(10)
  return projects
}

export const findProject = async (apiProjectId: string) => {
  const [project] = await db.select().from(apiProjects).where(eq(apiProjects.id, parseInt(apiProjectId))).limit(1)
  return project
}

export const createAPIProject = async (newProject: NewAPIProjectSchema) => {
  const [project] = await db
    .insert(apiProjects)
    .values({
      ...newProject,
      slug: slugify(newProject.title)
    })
    .returning({
      id: apiProjects.id,
      title: apiProjects.title,
      description: apiProjects.description,
      slug: apiProjects.slug,
      createdAt: apiProjects.createdAt
    })
  return project;
}

export const deleteAPIProject = async (projectID: string) => {
  const [deletedProject] = await db
    .delete(apiProjects)
    .where(eq(apiProjects.id, parseInt(projectID)))
    .returning({
      id: apiProjects.id,
      title: apiProjects.title,
      description: apiProjects.description,
      slug: apiProjects.slug
    });
  return deletedProject;
}

export const updateAPIProject = async (updateApiProject: ApiProjectsType, { title, description }: UpdateAPIProjectSchema) => {
  const [updatedUser] = await db
    .update(apiProjects)
    .set({
      title,
      description,
      slug: slugify(title ?? updateApiProject.title),
    })
    .where(eq(apiProjects.id, updateApiProject.id as number))
    .returning({
      id: apiProjects.id,
      title: apiProjects.title,
      description: apiProjects.description,
      slug: apiProjects.slug
    });
  return updatedUser;
}