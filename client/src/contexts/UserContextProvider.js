import { createContext, useContext, useState } from "react";
import {
  removeUserFromSession,
  removeUserFromStorage,
  setCardInSession,
  setCardInStorage,
  setUserInSession,
  setUserInStorage,
} from "../utilities/auth";
import { logoutUser, signIn, signUp } from "../utilities/authApi";
import { toast } from "react-toastify";
import { getUserCard } from "../utilities/cardApi";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [card, setCard] = useState("");
  const [token, setToken] = useState("");

  const login = async (user, rememberMe) => {
    try {
      const response = await signIn(user);
      if (rememberMe) {
        setUserInStorage(response.data.user, response.data.token);

        const card = await getUserCard(response.data.user.id);
        setCardInStorage(card.data);
      } else {
        setUserInSession(response.data.user, response.data.token);

        const card = await getUserCard(response.data.user.id);
        setCardInSession(card.data);
      }

      return response;
    } catch (error) {
      if (error.response.status === 403) {
        toast.error("Your account is deactivated! Please contact support", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      if (error.response.status === 401) {
        toast.error("Wrong username or password!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      console.log(error);
      return null;
    }
  };

  const register = async (user) => {
    try {
      const response = await signUp(user);
      setUserInStorage(response.data.user, response.data.token);
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const logout = async () => {
    try {
      removeUserFromStorage();
      removeUserFromSession();
      setUser("");
      await logoutUser(token);
    } catch (error) {
      setToken("");
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        card,
        setCard,
        token,
        setToken,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
