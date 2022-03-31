import LoginPage from "../Pages/LoginPage";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import CurrentPageNav from "../components/CurrentPageNav";
import { useUserContext } from "../contexts/UserContextProvider";
import { addItemPath, sellerPath } from "../utilities/paths";

const MyAccountPage = () => {
  const { user } = useUserContext();

  return user ? (
    <>
      <CurrentPageNav />
      <div className="px-40 2xl:px-72 mt-10">
        <div className="flex justify-end">
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
