import { GrFormClose } from "react-icons/gr";

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
    if (subCategories.length > 0) {
      getProducts(0, subCategories);
    }
  };

  const clearAllFilters = () => {
    setMinValue("");
    setMaxValue("");
    setSubCategories([]);
  };

  return (
    (minValue || maxValue || subCategories.length > 0) && (
      <div className="flex justify-between ml-6">
        {subCategories.length > 0 && (
          <div className="flex flex-col w-4/6 mb-4 mr-4 font-normal text-base">
            <label className="text-sm text-textTetriary mb-2">Category</label>
            <div className="flex flex-wrap">
              {categories.map(
                (category) =>
                  subCategories.includes(category.id.toString()) && (
                    <div key={category.id} className="flex mr-3 space-x-3 mb-2">
                      <p>{category.categoryName}</p>
                      <button
                        className="text-xl"
                        onClick={() => removeFilter(category.id)}
                      >
                        <GrFormClose className="text-sm opacity-40" />
                      </button>
                    </div>
                  )
              )}
            </div>
          </div>
        )}

        <div className="flex h-fit">
          {(minValue || maxValue) && (
            <div className="flex flex-col mr-16 mb-2 font-normal text-base ">
              <label className="text-sm text-textTetriary mb-2">
                Price range
              </label>
              <div className="flex">
                <p className="min-w-fit">
                  {minValue && maxValue
                    ? `$${minValue} - $${maxValue}`
                    : minValue
                    ? `> $${minValue}`
                    : maxValue && `< $${maxValue}`}
                </p>
                <button className="text-xl" onClick={resetPrice}>
                  <GrFormClose className="text-sm opacity-40 ml-3" />
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-center items-center mt-1 border-2 h-10 w-32 text-textTetriary">
            <p>Clear all</p>
            <button onClick={clearAllFilters}>
              <GrFormClose className="text-sm opacity-40 ml-3" />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SelectedFilters;
