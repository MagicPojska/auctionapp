import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getProductsSorted = (pageNumber, pageSize, sortBy) =>
  API.get(
    `/product/items?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`
  );
export const getCategoriesList = () => API.get("/product/categories");
