import { createContext, useContext } from "react";
import { getToken, removeUser, setUser } from "../utilities/auth";
import { logoutUser, signIn, signUp } from "../utilities/api";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const login = async (user) => {
    try {
      const data = await signIn(user);
      setUser(data.data.user, data.data.token);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const register = async (user) => {
    try {
      const data = await signUp(user);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const logout = async () => {
    try {
      const token = getToken();
      await logoutUser(token);
      removeUser();
    } catch (error) {
      console.log(error);
      removeUser();
    }
  };

  return (
    <UserContext.Provider value={{ login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
