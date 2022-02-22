import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
import { useState } from "react";
import { Link } from "react-router-dom";
import SocialMedia from "../components/SocialMedia";

const Navbar = () => {
  //State to show login or create account if user is not logged in and Hi, Jon Doe if user is logged in
  const [user, setUser] = useState(true);
  return (
    <header>
      <div className="bg-blackPrimary text-white h-10 flex items-center justify-between lg:pl-44 lg:pr-40 md:px-24 sm:px-10 px-4 text-sm">
        <div className="pl-[3px]">
          <SocialMedia />
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
