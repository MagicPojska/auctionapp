import { getToken } from "./auth";
import { API, addAuthHeader } from "./authApi";

export const postBid = (formData) =>
  API.post("/bids/add", formData, addAuthHeader(getToken()));
