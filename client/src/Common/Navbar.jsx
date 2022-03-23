import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  accountPath,
  categoriesPath,
  homePath,
  loginPath,
  registrationPath,
  shopPath,
} from "../utilities/paths";
import SocialMedia from "../components/SocialMedia";
import { getToken, getUserSession } from "../utilities/auth";
import { useUserContext } from "../contexts/UserContextProvider";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const { logout, user, setUser, setToken } = useUserContext();

  useEffect(() => {
    const userSession = getUserSession();
    if (userSession) {
      setUser(userSession);
      setToken(getToken());
    }
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchTerm);
  };

  const handleLogout = async () => {
    await logout();
  };
  return (
    <header>
      <div className="bg-blackPrimary text-white h-10 flex items-center justify-between 2xl:px-72 lg:pl-44 lg:pr-40 md:px-24 sm:px-10 px-4 text-sm">
        <div className="pl-[3px]">
          <SocialMedia />
        </div>

        {user ? (
          <div className="text-[14px] leading-[17px] flex space-x-10">
            <p>
              Hi, {user.firstName} {user.lastName}
            </p>
            <button
              onClick={handleLogout}
              className="text-[14px] leading-[17px] font-bold hover:text-gray-400"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-[14px]">
            <Link to={loginPath}>Login</Link>
            <span className="text-gray-400 px-5">{" or "}</span>
            <Link to={registrationPath}>Create an account</Link>
          </div>
        )}
      </div>

      {loginPath === location.pathname ||
      registrationPath === location.pathname ? (
        <div className="flex justify-center items-center py-[18px] border-b-2">
          <Link to="/" className="logo-link">
            <img
              src="/images/auction-app-logo.png"
              alt="logo"
              className="min-w-[163px] h-[56px]"
            ></img>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row justify-between items-center px-20 md:px-44 2xl:px-72 pt-4 pb-9">
          <Link to="/" className="logo-link">
            <img
              src="/images/auction-app-logo.png"
              alt="logo"
              className="min-w-[163px] h-[56px] xl:mr-20"
            ></img>
          </Link>

          <div className="flex flex-col lg:flex-row items-center justify-end w-full">
            <form
              action="submit"
              onSubmit={handleSearch}
              className="flex justify-between w-full  h-12 border-2 "
            >
              <input
                type="text"
                placeholder="Try enter: Shoes"
                className="w-full pl-5 font-light text-base focus:outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="text-lg mr-5">
                <AiOutlineSearch />
              </button>
            </form>

            <ul className="flex justify-start w-[262px] min-w-fit text-base leading-5 font-light ml-6 space-x-[30px] mt-5 lg:mt-0">
              <li>
                <NavLink
                  to={homePath}
                  className={
                    homePath === location.pathname
                      ? "text-purple font-bold"
                      : ""
                  }
                >
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${categoriesPath}/1`}
                  className={
                    location.pathname.includes(shopPath)
                      ? "text-purple font-bold"
                      : ""
                  }
                >
                  SHOP
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={accountPath}
                  className={
                    location.pathname.includes(accountPath)
                      ? "text-purple font-bold"
                      : ""
                  }
                >
                  MY ACCOUNT
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
