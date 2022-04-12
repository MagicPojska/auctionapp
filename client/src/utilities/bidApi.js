import { API } from "./authApi";

export const postBid = (formData) => API.post("/bids/add", formData);

export const getBidsForUser = (userId) => API.get(`/bids/user?id=${userId}`);
