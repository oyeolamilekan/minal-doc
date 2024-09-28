import asyncHandler from '../helpers/async-handler.helper';
import { Request, Response } from "express";
import { createAPIProject, deleteAPIProject, fetchProjects, findProject, updateAPIProject } from 'repositories/dashboard.repository';

export const fetchAPIProjectsController = asyncHandler(async (_: Request, res: Response) => {
  const projects = await fetchProjects();
  const response = {
    success: true,
    message: "Projects fetched",
    data: projects
  }
  res.status(200).json(response);
})

export const createAPIProjectController = asyncHandler(async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const payload = { title, description }
  const project = await createAPIProject(payload);
  const response = {
    success: true,
    message: "Project successfully created.",
    data: project
  }
  res.status(200).json(response);
})

export const deleteAPIProjectController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedProject = await deleteAPIProject(id);
  const response = {
    success: true,
    message: "Project successfully deleted.",
    data: deletedProject
  }
  res.status(200).json(response);
})

export const updateAPIProjectController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const project = await findProject(id)
  const updatedProject = await updateAPIProject(project, { title, description })
  const response = {
    success: true,
    message: "Project successfully updated.",
    data: updatedProject
  }
  res.status(200).json(response);
})

export const fetchAPIProjectController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await findProject(id)
  const response = {
    success: true,
    message: "Project successfully fetched.",
    data: project
  }
  res.status(200).json(response);
})


export const createAPISectionController = asyncHandler(async (_: Request, res: Response) => {})

export const fetchAPISectionController = asyncHandler(async (_: Request, res: Response) => {})

export const fetchAPISectionsController = asyncHandler(async (_: Request, res: Response) => {})

export const updateAPISectionController = asyncHandler(async (_: Request, res: Response) => {})

export const deleteAPISectionController = asyncHandler(async (_: Request, res: Response) => {})


export const createAPIEndpointController = asyncHandler(async (_: Request, res: Response) => {})

export const fetchAPIEndpointController = asyncHandler(async (_: Request, res: Response) => {})

export const fetchAPIEndpointsController = asyncHandler(async (_: Request, res: Response) => {})

export const updateAPIEndpointController = asyncHandler(async (_: Request, res: Response) => {})

export const deleteAPIEndpointController = asyncHandler(async (_: Request, res: Response) => {})
