import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  //State to show login or create account if user is not logged in and Hi, Jon Doe if user is logged in
  const [user, setUser] = useState(true);
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

      <div>White nav</div>
    </header>
  );
};

export default Navbar;
