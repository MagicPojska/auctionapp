import { useState, useEffect } from "react";
import Select from "react-select";
import { getCategoriesList } from "../../utilities/productsApi";
import { customStyles } from "../../utilities/selectStyle";

const StepOne = ({
  nextStep,
  handleInputData,
  productDetails,
  setProductDetails,
}) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getCategoriesList();
        setCategories(
          response.data
            .map((category) => ({
              value: category.id,
              label: category.categoryName,
              supercategoryId: category.supercategoryId,
            }))
            .filter((category) => category.supercategoryId === null)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const onCategoryChange = async (selectedOption) => {
    try {
      const response = await getCategoriesList();
      setSubcategories(
        response.data
          .map((category) => ({
            value: category.id,
            label: category.categoryName,
            supercategoryId: category.supercategoryId,
          }))
          .filter(
            (category) => category.supercategoryId === selectedOption.value
          )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubcategoryChange = (selectedOption) => {
    setProductDetails({ ...productDetails, categoryId: selectedOption.value });
  };

  return (
    <div className="border-2 px-24 font-normal">
      <div className="py-6 bg-bgWhite mb-12">
        <h2 className="text-center text-2xl font-bold leading-7">ADD ITEM</h2>
      </div>

      <label className="text-lg leading-7">What do you sell?</label>
      <div className="border-2 h-16 mb-8">
        <input
          type="text"
          className="w-full h-full outline-none px-6 bg-bgWhite"
          placeholder="eg. Targeal 7.1 Surround Sound Gaming Headset for PS4"
          value={productDetails.productName}
          onChange={handleInputData("productName")}
        />
      </div>

      <div className="flex space-x-6">
        <Select
          options={categories}
          onChange={onCategoryChange}
          className="flex-1"
          placeholder="Select Category"
          styles={customStyles}
          isSearchable={false}
          components={{
            IndicatorSeparator: () => null,
          }}
        />

        <Select
          options={subcategories}
          onChange={handleSubcategoryChange}
          className="flex-1"
          placeholder="Select Subcategory"
          styles={customStyles}
          isSearchable={false}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </div>
    </div>
  );
};

export default StepOne;
