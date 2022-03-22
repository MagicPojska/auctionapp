import { TiDelete } from "react-icons/ti";

const SelectedFilters = ({
  categories,
  subCategories,
  setSubCategories,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  getProducts,
}) => {
  const removeFilter = (subCategoryId) => {
    let idList = [...subCategories];
    idList = subCategories.filter((item) => item !== subCategoryId.toString());
    setSubCategories(idList);
  };

  const resetPrice = () => {
    if (minValue) {
      setMinValue("");
    }
    if (maxValue) {
      setMaxValue("");
    }
    getProducts(0, subCategories);
  };

  return (
    <div className="flex flex-wrap ml-6 mb-4 text-white font-normal text-base">
      {categories.map(
        (category) =>
          subCategories.includes(category.id.toString()) && (
            <div
              key={category.id}
              className="flex items-center bg-purple rounded-full py-2 px-4 mr-3 space-x-3 mb-2"
            >
              <p>{category.categoryName}</p>
              <button
                className="text-xl"
                onClick={() => removeFilter(category.id)}
              >
                <TiDelete />
              </button>
            </div>
          )
      )}

      {(minValue || maxValue) && (
        <div className="flex items-center bg-purple rounded-full py-2 px-4 mr-3 space-x-3 mb-2">
          <p>
            {minValue && maxValue
              ? `Between $${minValue} and $${maxValue}`
              : minValue
              ? `Above $${minValue}`
              : maxValue && `Bellow $${maxValue}`}
          </p>
          <button className="text-xl" onClick={resetPrice}>
            <TiDelete />
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectedFilters;
