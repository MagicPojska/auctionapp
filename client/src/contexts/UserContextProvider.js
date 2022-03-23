import { createContext, useContext, useState } from "react";
import { removeUserFromStorage, setUserSession } from "../utilities/auth";
import { logoutUser, signIn, signUp } from "../utilities/authApi";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const login = async (user, rememberMe) => {
    try {
      const response = await signIn(user);
      if (rememberMe) {
        setUserSession(response.data.user, response.data.token);
      } else {
        setUser(response.data.user);
        setToken(response.data.token);
      }
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const register = async (user) => {
    try {
      const response = await signUp(user);
      setUserSession(response.data.user, response.data.token);
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const logout = async () => {
    try {
      removeUserFromStorage();
      setUser("");
      await logoutUser(token);
      setToken("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, login, register, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
