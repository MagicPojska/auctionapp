import { API } from "./authApi";

export const postBid = (formData) => API.post("/bids/add", formData);

export const getBidsForUser = (userId) => API.get(`/bids/user?id=${userId}`);

export const getBidsForProduct = (productId, pageNumber) =>
  API.get(`/bids/product?id=${productId}&pageNumber=${pageNumber}`);
