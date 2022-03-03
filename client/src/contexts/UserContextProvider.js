import { createContext, useContext } from "react";
import { getToken, removeUser, setUser } from "../utilities/auth";
import axios from "axios";

const UserContext = createContext();
const baseURL = "http://localhost:8080/auth";
const token = getToken();
const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const UserContextProvider = ({ children }) => {
  const login = async (user) => {
    try {
      const data = await axios.post(baseURL + "/login", user);
      setUser(data.data.user, data.data.token);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const register = async (user) => {
    try {
      const data = await axios.post(baseURL + "/register", user);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const logout = async () => {
    try {
      await axios.get(baseURL + "/logout", config);
      removeUser();
    } catch (error) {
      console.log(error);
      removeUser();
      return null;
    }
  };

  return (
    <UserContext.Provider value={{ login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
