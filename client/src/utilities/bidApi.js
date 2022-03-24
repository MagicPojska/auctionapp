import { API, addAuthHeader } from "./authApi";

export const postBid = (formData, token) =>
  API.post("/bids/add", formData, addAuthHeader(token));
