import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  categoriesPath,
  homePath,
  loginPath,
  myAccountPath,
  profilePath,
  registrationPath,
  shopPath,
  myBidsPath,
  settingsPath,
  becomeSellerPath,
  wishlistPath,
} from "../utilities/paths";
import SocialMedia from "../components/SocialMedia";
import {
  getTokenFromSession,
  getTokenFromStorage,
  getUserFromSession,
  getUserFromStorage,
} from "../utilities/auth";
import { useUserContext } from "../contexts/UserContextProvider";
import { GrFormClose } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNotificationOpened, setIsNotificationOpened] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user, setUser, setToken } = useUserContext();

  useEffect(() => {
    if (getUserFromStorage() !== null) {
      setUser(getUserFromStorage());
      setToken(getTokenFromStorage());
    } else if (getUserFromSession() !== null) {
      setUser(getUserFromSession());
      setToken(getTokenFromSession());
    }
    if (!location.pathname.includes(shopPath)) {
      setSearchTerm("");
    }
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`${categoriesPath}/search/${searchTerm}`);
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
            <button>
              <Link to={myAccountPath + profilePath} className="font-bold">
                Hi, {user.firstName} {user.lastName}
              </Link>
            </button>

            <div className="relative group">
              <button
                className="py-4 relative border-2 border-transparent text-white rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
                onClick={() => setIsNotificationOpened(!isNotificationOpened)}
              >
                <IoMdNotificationsOutline className="fill-white text-xl" />
                <span className="absolute inset-0 object-right-top -mr-6 mt-2">
                  <div className="inline-flex items-center px-1 py-0.25 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                    6
                  </div>
                </span>
              </button>

              <div
                className={`absolute z-10 ${
                  isNotificationOpened ? "block" : "hidden"
                } -left-8`}
              >
                <div className="py-8 w-80 flex bg-white border-2">
                  <div className="grid grid-cols-1 gap-6 text-black px-6 max-h-96 overflow-auto">
                    <div>
                      You lost your highest bid place! Your bid of $50 isn't the
                      highest bid anymore.
                    </div>

                    <div>
                      You lost your highest bid place! Your bid of $50 isn't the
                      highest bid anymore.
                    </div>

                    <div>
                      You lost your highest bid place! Your bid of $50 isn't the
                      highest bid anymore.
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
              className="flex justify-between w-full h-12 border-2 "
            >
              <input
                type="text"
                placeholder="Try enter: Shoes"
                className="w-full pl-5 font-light text-base focus:outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <div className="flex items-center space-x-4 mr-5">
                <GrFormClose
                  className="text-lg cursor-pointer"
                  onClick={() => {
                    setSearchTerm("");
                  }}
                />
                <button className="text-lg ">
                  <AiOutlineSearch />
                </button>
              </div>
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
                  to={`${categoriesPath}/search`}
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
                <div className="relative group">
                  <NavLink
                    to={`${myAccountPath}${profilePath}`}
                    className={
                      location.pathname.includes(myAccountPath)
                        ? "text-purple font-bold"
                        : ""
                    }
                  >
                    MY ACCOUNT
                  </NavLink>
                  <div className="absolute z-10 hidden group-hover:block  -left-8 pt-10">
                    <div className="py-8 w-44 flex justify-center bg-white border-2">
                      <div className="grid grid-cols-1 gap-6">
                        <Link
                          to={myAccountPath + profilePath}
                          className={
                            location.pathname.includes(
                              myAccountPath + profilePath
                            )
                              ? "text-purple"
                              : ""
                          }
                        >
                          Profile
                        </Link>
                        <Link
                          to={becomeSellerPath}
                          className={
                            location.pathname.includes(becomeSellerPath)
                              ? "text-purple"
                              : ""
                          }
                        >
                          Become Seller
                        </Link>
                        <Link
                          to={myBidsPath}
                          className={
                            location.pathname.includes(myBidsPath)
                              ? "text-purple"
                              : ""
                          }
                        >
                          Your Bids
                        </Link>
                        <Link
                          to={wishlistPath}
                          className={
                            location.pathname.includes(wishlistPath)
                              ? "text-purple"
                              : ""
                          }
                        >
                          Wishlist
                        </Link>
                        <Link
                          to={settingsPath}
                          className={
                            location.pathname.includes(settingsPath)
                              ? "text-purple"
                              : ""
                          }
                        >
                          Settings
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
