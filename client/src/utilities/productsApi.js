import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getProductsSorted = (pageNumber, pageSize, sortBy) =>
  API.get(
    `/product/items?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`
  );
export const getCategoriesList = () => API.get("/product/categories");

export const getProductsByCategory = (pageNumber, pageSize, categoryId) =>
  API.get(
    `/product/items/category?pageNumber=${pageNumber}&${categoryId
      .map((item) => `categoryId=${item}&`)
      .join("")}pageSize=${pageSize}`
  );
