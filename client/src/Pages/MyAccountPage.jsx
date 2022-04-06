import LoginPage from "../Pages/LoginPage";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import CurrentPageNav from "../components/CurrentPageNav";
import { useUserContext } from "../contexts/UserContextProvider";
import {
  addItemPath,
  becomeSellerPath,
  myAccountPath,
  myBidsPath,
  profilePath,
  sellerPath,
} from "../utilities/paths";
import { profileTabs } from "../utilities/constants";
import ProfileTab from "../components/MyAccount/ProfileTab";
import SellerTab from "../components/MyAccount/SellerTab";
import BidsTab from "../components/MyAccount/BidsTab";

const MyAccountPage = () => {
  const { user } = useUserContext();
  const location = useLocation();

  return user ? (
    <>
      <CurrentPageNav />
      <div className="px-40 2xl:px-72 mt-10">
        <div className="flex justify-between">
          <div className="flex space-x-2 font-normal">
            {profileTabs.map((tab, id) => (
              <div key={id}>
                <Link
                  to={tab.path}
                  className={`px-4 py-3 flex items-center ${
                    location.pathname.includes(tab.path) &&
                    "bg-purple text-white"
                  }`}
                >
                  <tab.icon className="mr-4 text-lg" /> {tab.title}
                </Link>
              </div>
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

        {(() => {
          switch (location.pathname) {
            case myAccountPath + profilePath:
              return <ProfileTab />;
            case becomeSellerPath:
              return <SellerTab />;
            case myBidsPath:
              return <BidsTab />;
          }
        })()}
      </div>
    </>
  ) : (
    <LoginPage />
  );
};
export default MyAccountPage;
