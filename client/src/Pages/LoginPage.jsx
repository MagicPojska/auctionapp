import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContextProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPasswordPath, homePath } from "../utilities/paths";

const LoginPage = () => {
  const { login } = useUserContext();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await login(user, rememberMe);
    if (data !== null) {
      navigate(homePath);
    }
  };

  return (
    <div className="mx-[22rem] pt-10 2xl:mx-[28rem]">
      <ToastContainer />
      <div className="border-2">
        <div className="w-full h-20 flex justify-center items-center bg-gray-50">
          <h1 className="font-bold leading-tight text-2xl text-black">LOGIN</h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-12 font-normal text-lg leading-7 mx-24"
        >
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
          <div className="mt-6 space-x-4 flex items-center">
            <input
              value={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              type="checkbox"
            />
            <label>Remember me</label>
          </div>
          <div>
            <button
              className="w-full h-14 mt-16 bg-purple text-white"
              type="submit"
            >
              LOGIN
            </button>
          </div>
        </form>

        <div className="text-purple font-bold text-base text-center mt-12 mb-16 leading-7 mx-24">
          <Link to={forgotPasswordPath}>Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
