const setUserInStorage = (user, token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

const setCardInStorage = (card) => {
  localStorage.setItem("card", JSON.stringify(card));
};

const getCardFromStorage = () => {
  const card = localStorage.getItem("card");
  return JSON.parse(card);
};

const updateUserInStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("card");
};

const getUserFromStorage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

const getTokenFromStorage = () => {
  return localStorage.getItem("token") || null;
};

const setUserInSession = (user, token) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};

const setCardInSession = (card) => {
  sessionStorage.setItem("card", JSON.stringify(card));
};

const getCardFromSession = () => {
  const card = sessionStorage.getItem("card");
  return JSON.parse(card);
};

const updateUserInSession = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("card");
};

const getUserFromSession = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  return user;
};

const getTokenFromSession = () => {
  return sessionStorage.getItem("token") || null;
};

const getUserId = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).id : null;
};

export {
  setUserInStorage,
  setCardInStorage,
  getCardFromStorage,
  updateUserInStorage,
  removeUserFromStorage,
  getUserFromStorage,
  getUserId,
  getTokenFromStorage,
  setUserInSession,
  setCardInSession,
  getCardFromSession,
  updateUserInSession,
  removeUserFromSession,
  getUserFromSession,
  getTokenFromSession,
};
