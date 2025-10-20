import axios from "./axiosInstance";

export const getProjects = () => axios.get("/projects");
export const getProjectById = (id) => axios.get(`/projects/${id}`);
export const createProject = (data) => axios.post("/projects", data);
export const updateProject = (id, data) => axios.put(`/projects/${id}`, data);
export const deleteProject = (id) => axios.delete(`/projects/${id}`);
