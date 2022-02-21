import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
const SocialMedia = () => {
  return (
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
  );
};

export default SocialMedia;
