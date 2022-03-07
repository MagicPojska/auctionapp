import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContextProvider";
import { loginPath } from "../utilities/paths";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const data = await register(user);
    if (data === null) {
      toast.error("User already exists!", {
        position: toast.POSITION.OP_CENTER,
      });
    } else {
      navigate(loginPath);
    }
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
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
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
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
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
