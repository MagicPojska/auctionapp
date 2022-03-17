import { Link } from "react-router-dom";
import { homePath } from "../utilities/paths";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center mx-40">
      <div className="flex flex-col items-center">
        <img
          src="/images/auction-app-logo.png"
          alt="logo"
          className="mb-16 mt-36"
        />
        <h1 className="font-normal text-purple text-[192px] mb-16">404</h1>

        <h6 className="mb-8 text-2xl font-normal text-center text-gray-800 md:text-3xl">
          Ooops! Looks like the page is Not Found
        </h6>

        <Link
          to={homePath}
          className="flex border-4 border-purple w-40 h-14 justify-center items-center leading-7 text-base font-bold"
        >
          GO BACK
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
