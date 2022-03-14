import { useRef, useState } from "react";

const CategoriesAccordion = ({
  categories,
  item,
  subCategories,
  setSubCategories,
}) => {
  const [isOpened, setOpened] = useState(false);

  const contentElement = useRef(null);

  const handleOpening = () => {
    setOpened(!isOpened);
  };

  const filterItems = (e) => {
    let idList = [...subCategories];
    if (e.target.checked) {
      idList = [...subCategories, e.target.value];
    } else {
      idList = subCategories.filter((item) => item !== e.target.value);
    }
    setSubCategories(idList);
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
            // style={{ height: height }}
            className={`overflow-hidden transition-all duration-200 ${
              !isOpened && "hidden"
            }`}
          >
            <div className="mt-8">
              {categories.map(
                (subcategory) =>
                  subcategory.supercategoryId === item.id && (
                    <div
                      key={subcategory.id}
                      className="flex items-center pb-6"
                    >
                      <input
                        type="checkbox"
                        className="accent-purple"
                        value={subcategory.id}
                        onChange={filterItems}
                      />
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
