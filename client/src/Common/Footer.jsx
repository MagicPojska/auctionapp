import { Link } from "react-router-dom";
import SocialMedia from "../components/SocialMedia";
import { aboutUsPath, privacyPolicyPath, termsPath } from "../utilities/paths";

const Footer = () => {
  return (
    <footer className="h-96 bg-blackPrimary w-full text-white flex flex-col md:flex-row justify-between py-8 px-10 sm:px-48 md:px-40 mt-20">
      <div className="">
        <h5 className="pb-6 text-gray-400">AUCTION</h5>
        <ul className="space-y-[12px] text-base text-textSecondary ">
          <li>
            <Link to={aboutUsPath} className="hover:text-white">
              About Us
            </Link>
          </li>
          <li>
            <Link to={termsPath} className="hover:text-white">
              Terms and Conditions
            </Link>
          </li>
          <li>
            <Link to={privacyPolicyPath} className="hover:text-white">
              Privacy and Policy
            </Link>
          </li>
        </ul>
      </div>

      <div className="">
        <h5 className="pb-6 text-gray-400">GET IN TOUCH</h5>
        <ul className="space-y-[12px] text-textSecondary">
          <li>
            <span>Call Us at +123 797-567-2535</span>
          </li>
          <li>
            <span>support@auction.com</span>
          </li>
          <li>
            <SocialMedia />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
