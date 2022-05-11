import { getUserId } from "./auth";
import { API } from "./authApi";

export const countNotifications = () =>
  API.get(`/notifications/number-of-notifications?userId=${getUserId()}`);

export const getAllNotifications = (pageNumber) =>
  API.get(`/notifications?userId=${getUserId()}&pageNumber=${pageNumber}`);

export const clearAllNotifications = () =>
  API.get(`/notifications/clear-notifications?userId=${getUserId()}`);

export const clearNotification = (id) =>
  API.get(`/notifications/clear-notification?notificationId=${id}`);
