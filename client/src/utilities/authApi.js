import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

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
