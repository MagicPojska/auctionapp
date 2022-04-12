import { Link } from "react-router-dom";
import { categoriesPath } from "../../utilities/paths";

const LandingPageCategories = ({ categories }) => {
  return (
    <div className="h-full">
      <h3 className="text-base leading-5 font-bold ml-4 mb-4 text-purple">
        CATEGORIES
      </h3>
      <div className="h-[32rem] w-64 overflow-y-auto scrollbar">
        {categories.map(
          (item) =>
            item.supercategoryId === null && (
              <div
                className="bg-white h-14  flex p-4 border-b-[1px] border-gray-300 items-center"
                key={item.id}
              >
                <Link
                  to={`${categoriesPath}/${item.id}`}
                  className="text-base leading-6 font-normal"
                >
                  {item.categoryName}
                </Link>
              </div>
            )
        )}
      </div>
      <div className="bg-white h-14 w-64 flex p-4 border-b-[1px] border-gray-300 items-center">
        <Link
          to={`${categoriesPath}/1`}
          className="text-base leading-6 font-normal"
        >
          All Categories
        </Link>
      </div>
    </div>
  );
};

export default LandingPageCategories;
