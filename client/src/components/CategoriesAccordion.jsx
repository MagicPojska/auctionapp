import { Link } from "react-router-dom";
import { categoriesPath } from "../utilities/paths";

const CategoriesAccordion = ({ categories }) => {
  return (
    <div className="w-64 min-w-max h-max border-2 p-6">
      <h3 className="text-base font-bold text-purple">PRODUCT CATEGORIES</h3>
      {categories.map(
        (item) =>
          item.supercategoryId === null && (
            <div className="bg-white h-14  flex items-center" key={item.id}>
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
  );
};

export default CategoriesAccordion;
