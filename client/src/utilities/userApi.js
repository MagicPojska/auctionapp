import { API } from "./authApi";

export const updateUser = (formData) => API.put("/user/update", formData);
export const deactivateUserAccount = (userId) =>
  API.get(`/user/deactivate?userId=${userId}`);
