import { API } from "./authApi";

export const postBid = (formData) => API.post("/bids/add", formData);
