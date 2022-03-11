import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { categoriesPath } from "../utilities/paths";

const CategoriesAccordion = ({ categories, item }) => {
  const [isOpened, setOpened] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentElement = useRef(null);

  const handleOpening = () => {
    setOpened(!isOpened);
    setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px");
  };

  return (
    <>
      {item.supercategoryId === null && (
        <div className="mb-6">
          <div
            onClick={handleOpening}
            className="flex justify-between cursor-pointer"
          >
            <h4 className="font-normal">{item.categoryName}</h4>
            <p className="font-normal">{isOpened ? "-" : "+"}</p>
          </div>
          <div
            ref={contentElement}
            style={{ height: height }}
            className="overflow-hidden transition-all duration-200"
          >
            <div className="mt-8">
              {categories.map(
                (subcategory) =>
                  subcategory.supercategoryId === item.id && (
                    <div
                      key={subcategory.id}
                      className="flex items-center pb-6"
                    >
                      <input type="checkbox" className="accent-purple" />
                      <p className="text-textTetriary text-base font-light ml-3">
                        {subcategory.categoryName}&nbsp;(
                        {subcategory.numberOfProducts})
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesAccordion;
