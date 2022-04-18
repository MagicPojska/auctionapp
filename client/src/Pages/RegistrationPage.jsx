import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContextProvider";
import { homePath, loginPath } from "../utilities/paths";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { capitalizeWord } from "../utilities/helperFunctions";

const RegistrationPage = () => {
  const { register } = useUserContext();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!validateEmail(user.email) || !validatePassword(user.password)) {
      return;
    }

    const data = await register(user);
    if (data === null) {
      toast.error("User already exists!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      navigate(homePath);
    }
  };

  const validateEmail = (email) => {
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (!regEmail.test(email)) {
      toast.error("Invalid email", {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    const regPassword = {
      capital: /[A-Z]/,
      digit: /[0-9]/,
      full: /^[A-Za-z0-9]{7,20}$/,
    };
    if (
      !regPassword.capital.test(password) ||
      !regPassword.digit.test(password) ||
      !regPassword.full.test(password)
    ) {
      toast.error(
        "Password length must be atleast 8 characters, contain one upper case letter and one number",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      return false;
    }
    return true;
  };

  return (
    <div className="mx-[22rem] 2xl:mx-[28rem] pt-10">
      <ToastContainer />

      <div className="border-2">
        <div className="w-full h-20 flex justify-center items-center bg-gray-50">
          <h1 className="font-bold leading-tight text-2xl text-black">
            REGISTER
          </h1>
        </div>

        <form
          onSubmit={handleRegistration}
          className="mt-12 font-normal text-lg leading-7 mx-24"
        >
          <div className="mb-8">
            <label>First Name</label>
            <input
              type="text"
              placeholder="John"
              value={user.firstName}
              className="w-full mt-4 h-16 border-2 bg-gray-50 pl-6 font-light text-base focus:outline-none"
              onChange={(e) => {
                if (e.target.value.match("^[a-zA-Z]*$") != null) {
                  setUser({
                    ...user,
                    firstName:
                      e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1),
                  });
                }
              }}
              required
            />
          </div>
          <div className="mb-8">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              value={user.lastName}
              className="w-full mt-4 h-16 border-2 bg-gray-50 pl-6 font-light text-base focus:outline-none"
              onChange={(e) => {
                if (e.target.value.match("^[a-zA-Z]*$") != null) {
                  setUser({
                    ...user,
                    lastName: capitalizeWord(e),
                  });
                }
              }}
              required
            />
          </div>
          <div className="mb-8">
            <label>Email</label>
            <input
              type="email"
              placeholder="user@domain.com"
              value={user.email}
              className="w-full mt-4 h-16 border-2 bg-gray-50 pl-6 font-light text-base focus:outline-none"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={user.password}
              className="w-full mt-4 h-16 border-2 bg-gray-50 pl-6 font-light text-base focus:outline-none"
              placeholder="*********"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>
          <div>
            <button
              className="w-full h-14 mt-16 bg-purple text-white"
              type="submit"
            >
              REGISTER
            </button>
          </div>
        </form>

        <div className="flex justify-center space-x-7 font-bold text-base text-center mt-12 mb-16 leading-7 mx-24">
          <p className="text-gray-400">Already have an account?</p>
          <Link to={loginPath} className="text-purple ">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
