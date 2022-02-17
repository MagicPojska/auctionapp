import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  //State to show login or create account if user is not logged in and Hi, Jon Doe if user is logged in
  const [user, setUser] = useState(true);
  const location = useLocation();

  return (
    <header>
      <div className="bg-black text-white h-10 flex items-center justify-between lg:pl-44 lg:pr-40 md:px-24 sm:px-10 px-4 text-sm">
        <div className="flex items-center space-x-[16.4px] text-gray-400 pl-[3px]">
          <a
            href="https://www.facebook.com/magicpojska/"
            rel="noreferrer"
            target="_blank"
            className="text-[24px]"
          >
            <SiFacebook />
          </a>
          <a
            href="https://www.instagram.com/magic_pojska/"
            rel="noreferrer"
            target="_blank"
            className="p-1 text-[16px] rounded-full bg-gray-400 text-black"
          >
            <SiInstagram />
          </a>

          <a
            href="https://twitter.com/magicpojska"
            rel="noreferrer"
            target="_blank"
            className="p-1 text-[16px] rounded-full bg-gray-400 text-black"
          >
            <SiTwitter />
          </a>
        </div>
        {user ? (
          <div className="text-[14px] leading-[17px]">Hi, Jon Doe</div>
        ) : (
          <div className="text-[14px]">
            <Link to="/">Login</Link>{" "}
            <span className="text-gray-400 px-5">or</span>{" "}
            <Link to="/">Create an account</Link>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center px-44 pt-4 pb-9">
        <Link to="/" className="logo-link">
          <img src="/images/auction-app-logo.png" alt="logo"></img>
        </Link>

        <div className="flex items-center">
          <form
            action="submit"
            className="flex justify-between w-[548px] h-12 border-2 "
          >
            <input
              type="text"
              placeholder="Try enter: Shoes"
              className="w-full pl-5 font-light text-base focus:outline-none"
            />
            <button className="text-lg mr-5">
              <AiOutlineSearch />
            </button>
          </form>

          <ul className="flex justify-start w-[262px] text-base leading-5 font-light ml-6 space-x-[30px]">
            <li>
              <NavLink
                to="/"
                className={
                  "/" === location.pathname ? "text-purple font-bold" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={
                  "/shop" === location.pathname ? "text-purple font-bold" : ""
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account"
                className={
                  "/account" === location.pathname
                    ? "text-purple font-bold"
                    : ""
                }
              >
                My Account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
