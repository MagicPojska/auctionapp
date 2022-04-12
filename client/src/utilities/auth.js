const setUserInStorage = (user, token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

const updateUserInStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
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

const updateUserInSession = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
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
  updateUserInStorage,
  removeUserFromStorage,
  getUserFromStorage,
  getUserId,
  getTokenFromStorage,
  setUserInSession,
  updateUserInSession,
  removeUserFromSession,
  getUserFromSession,
  getTokenFromSession,
};
