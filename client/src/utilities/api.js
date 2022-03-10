import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const addAuthHeader = (token) => {
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

export const getProductsSorted = (pageNumber, pageSize, sortBy) =>
  API.get(
    `/product/items?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`
  );
export const getCategoriesList = () => API.get("/product/categories");
export const getProductsByCategory = (pageNumber, pageSize, categoryId) =>
  API.get(
    `/product/items/category?pageNumber=${pageNumber}&pageSize=${pageSize}&categoryId=${categoryId}`
  );
