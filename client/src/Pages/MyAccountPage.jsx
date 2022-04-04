import LoginPage from "../Pages/LoginPage";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import CurrentPageNav from "../components/CurrentPageNav";
import { useUserContext } from "../contexts/UserContextProvider";
import { addItemPath, sellerPath } from "../utilities/paths";
import { profileTabs } from "../utilities/constants";

const MyAccountPage = () => {
  const { user } = useUserContext();
  const location = useLocation();

  return user ? (
    <>
      <CurrentPageNav />
      <div className="px-40 2xl:px-72 mt-10">
        <div className="flex justify-between">
          <div className="flex space-x-2 font-normal">
            {profileTabs.map((tab) => (
              <Link
                to={tab.path}
                className={`px-4 py-3 flex items-center ${
                  location.pathname.includes(tab.path) && "bg-purple text-white"
                }`}
              >
                <tab.icon className="mr-4" /> {tab.title}
              </Link>
            ))}
          </div>

          <Link
            to={addItemPath + sellerPath}
            className="bg-purple text-white font-bold text-base leading-7 py-3 px-14 flex items-center space-x-8"
          >
            <span className="text-xl">
              <AiOutlinePlus />
            </span>
            <span>ADD ITEM</span>
          </Link>
        </div>
      </div>
    </>
  ) : (
    <LoginPage />
  );
};
export default MyAccountPage;
