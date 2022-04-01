import { API } from "./authApi";

export const getProductsSorted = (pageNumber, pageSize, sortBy) =>
  API.get(
    `/product/items?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`
  );

export const getProductById = (id) => API.get(`/product/item/${id}`);

export const getCategoriesList = () => API.get("/categories");

export const getProductsByCategory = (
  pageNumber,
  pageSize,
  categoryId,
  lowPrice,
  highPrice,
  sortBy
) =>
  API.get(
    `/product/items/category?pageNumber=${pageNumber}&${categoryId
      .map((item) => `categoryId=${item}&`)
      .join(
        ""
      )}pageSize=${pageSize}&lowPrice=${lowPrice}&highPrice=${highPrice}&sort=${
      sortBy.sortCriterium && sortBy.sortOrder
        ? `${sortBy.sortCriterium},${sortBy.sortOrder}`
        : ""
    }`
  );

export const getProductPriceRange = () => API.get("/product/items/price-range");
