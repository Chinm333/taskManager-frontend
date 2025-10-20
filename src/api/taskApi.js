import axios from "./axiosInstance";

export const getAllTasks = () => axios.get(`/tasks`);
export const createTask = (projectId, data) => axios.post(`/tasks`, { ...data, projectId });
export const updateTask = (taskId, data) => axios.put(`/tasks/${taskId}`, data);
export const deleteTask = (taskId) => axios.delete(`/tasks/${taskId}`);
export const getTaskByProjectId = (projectId) => axios.get(`/tasks/${projectId}`);
