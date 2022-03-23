import { createContext, useContext, useState } from "react";
import { removeUser, setUserSession } from "../utilities/auth";
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
      await logoutUser(token);
      removeUser();
    } catch (error) {
      console.error(error);
      removeUser();
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
