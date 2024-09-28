import { axiosInstance } from "@/config/api";

export const apiProjects = async () => {
  const { data } = await axiosInstance.get('dashboard/projects');
  return data;
}

export const createProject = async (body: { title: string, description: string }) => {
  const { data } = await axiosInstance.post('dashboard/create_project', body);
  return data;
}

export const deleteProject = async (id: string) => {
  const { data } = await axiosInstance.delete(`dashboard/delete_project/${id}`);
  return data;
}

export const updateProject = async (id: string, body: { title: string, description: string }) => {
  const { data } = await axiosInstance.put(`dashboard/update_project/${id}`, body);
  return data;
}

export const fetchProject = async (id: string) => {
  const { data } = await axiosInstance.get(`dashboard/fetch_project/${id}`);
  return data;
}