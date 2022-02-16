import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";

const Navbar = () => {
  return (
    <header>
      <div className="bg-black text-white h-9 flex items-center justify-between px-48 text-sm">
        <div className="flex items-center space-x-4 text-gray-400">
          <a
            href="https://www.facebook.com/magicpojska/"
            rel="noreferrer"
            target="_blank"
            className="text-[22px]"
          >
            <SiFacebook />
          </a>
          <a
            href="https://www.instagram.com/magic_pojska/"
            rel="noreferrer"
            target="_blank"
            className="p-1 rounded-full bg-gray-400 text-black"
          >
            <SiInstagram />
          </a>

          <a
            href="https://twitter.com/magicpojska"
            rel="noreferrer"
            target="_blank"
            className="p-1 rounded-full bg-gray-400 text-black"
          >
            <SiTwitter />
          </a>
        </div>
        <div className="text-s">Hi, Jon Doe</div>
      </div>

      <div>White nav</div>
    </header>
  );
};

export default Navbar;
