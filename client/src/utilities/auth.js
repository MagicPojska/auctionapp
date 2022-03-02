const setUser = (user, token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

const removeSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

const getUserId = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).id : null;
};

const getToken = () => {
  return localStorage.getItem("token") || null;
};

export { setUser, removeSession, getUser, getUserId, getToken };
