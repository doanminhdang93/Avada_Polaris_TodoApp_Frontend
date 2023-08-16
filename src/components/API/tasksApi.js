import axiosClient from "./axiosClient";

const tasksApi = {
  getAll: () => {
    return axiosClient.get("/tasks");
  },
  getById: (id) => {
    return axiosClient.get(`/task/${id}`);
  },
  delete: (ids) => {
    return axiosClient.delete(`/taskIds`, ids);
  },
  create: (params) => {
    return axiosClient.post("/task", params);
  },
  update: (id, params) => {
    return axiosClient.put(`/task/${id}`, params);
  },
  updateStatus: (ids) => {
    return axiosClient.put(`/taskIds`, ids);
  },
};
export default tasksApi;
