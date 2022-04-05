import { API } from "./authApi";

export const updateUser = (formData) => API.put("/user/update", formData);
