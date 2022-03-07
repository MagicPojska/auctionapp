import { createContext, useContext, useState } from "react";
import { getToken, removeUser, setUserSession } from "../utilities/auth";
import { logoutUser, signIn, signUp } from "../utilities/api";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const login = async (user) => {
    try {
      const response = await signIn(user);
      setUserSession(response.data.user, response.data.token);
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const register = async (user) => {
    try {
      const response = await signUp(user);
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const logout = async () => {
    try {
      const token = getToken();
      await logoutUser(token);
      removeUser();
    } catch (error) {
      console.error(error);
      removeUser();
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
