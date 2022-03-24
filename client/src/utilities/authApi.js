import axios from "axios";
import { removeUserFromSession, removeUserFromStorage } from "./auth";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      removeUserFromSession();
      removeUserFromStorage();
      window.location = "/login";
    }
    return error;
  }
);

export { API };

export const addAuthHeader = (token) => {
  return {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export const signIn = (formData) => API.post("/auth/login", formData);
export const signUp = (formData) => API.post("/auth/register", formData);
export const logoutUser = (token) =>
  API.get("/auth/logout", addAuthHeader(token));
