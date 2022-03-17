import { API } from "./authApi";

export const getProductsSorted = (pageNumber, pageSize, sortBy) =>
  API.get(
    `/product/items?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`
  );

export const getProductById = (id) => API.get(`/product/item/${id}`);

export const getCategoriesList = () => API.get("/categories");

export const getProductsByCategory = (pageNumber, pageSize, categoryId) =>
  API.get(
    `/product/items/category?pageNumber=${pageNumber}&${categoryId
      .map((item) => `categoryId=${item}&`)
      .join("")}pageSize=${pageSize}`
  );
