import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" flex-end h-96 bg-[#252525] w-full text-white flex justify-between py-8 px-40">
      <div className="">
        <h5 className="pb-6 text-gray-400">AUCTION</h5>
        <ul className="space-y-[12px] text-base">
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/terms-and-conditions">Terms and Conditions</Link>
          </li>
          <li>
            <Link to="/privacy-and-policy">Privacy and Policy</Link>
          </li>
        </ul>
      </div>

      <div className="">
        <h5 className="pb-6 text-gray-400">GET IN TOUCH</h5>
        <ul className="space-y-[12px]">
          <li>
            <span>Call Us at +123 797-567-2535</span>
          </li>
          <li>
            <span>support@auction.com</span>
          </li>
          <li>
            <div className="flex items-center space-x-[16.4px] text-gray-400">
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
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
