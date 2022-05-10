import axios from "axios";
import {
  getTokenFromSession,
  getTokenFromStorage,
  removeUserFromSession,
  removeUserFromStorage,
} from "./auth";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      removeUserFromSession();
      removeUserFromStorage();
    }
    return Promise.reject(error);
  }
);

API.interceptors.request.use((config) => {
  if (getTokenFromStorage() !== null) {
    config.headers["Authorization"] = `Bearer ${getTokenFromStorage()}`;
  } else if (getTokenFromSession() !== null) {
    config.headers["Authorization"] = `Bearer ${getTokenFromSession()}`;
  }
  return config;
});

export { API };

export const signIn = (formData) => API.post("/auth/login", formData);
export const signUp = (formData) => API.post("/auth/register", formData);
export const logoutUser = () => API.get("/auth/logout");
export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", email);
export const resetPassword = (formData) =>
  API.post("/auth/reset-password", formData);
