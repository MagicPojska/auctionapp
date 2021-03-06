import { useEffect, useRef, useState } from "react";

const CategoriesAccordion = ({
  categories,
  item,
  subCategories,
  setSubCategories,
  id,
}) => {
  const [isOpened, setOpened] = useState(
    parseInt(id) === item.id ? true : false
  );

  useEffect(() => {
    if (id != "search") {
      const idList = categories
        .filter((cat) => cat && cat.supercategoryId === parseInt(id))
        .map((cat) => cat.id.toString());

      setSubCategories(idList);
    }
  }, []);

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
                        checked={subCategories.includes(
                          subcategory.id.toString()
                        )}
                      />
                      <label className="text-textTetriary text-base font-light ml-3">
                        {subcategory.categoryName}&nbsp;(
                        {subcategory.numberOfProducts})
                      </label>
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
