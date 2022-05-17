import { API } from "./authApi";

export const getUserCard = async (userId) => API.get(`/card?userId=${userId}`);
