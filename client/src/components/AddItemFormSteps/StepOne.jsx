import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { getCategoriesList } from "../../utilities/productsApi";
import { customStyles } from "../../utilities/selectStyle";
import { myAccountPath, profilePath } from "../../utilities/paths";

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
    <div className="border-2 px-24 pb-16 font-normal">
      <div className="py-6 bg-bgWhite mb-12">
        <h2 className="text-center text-2xl font-bold leading-7">ADD ITEM</h2>
      </div>

      <label className="text-lg leading-7">What do you sell?</label>
      <div className="border-2 h-16 mb-8 mt-4">
        <input
          type="text"
          className="w-full h-full outline-none px-6 bg-bgWhite"
          placeholder="eg. Targeal 7.1 Surround Sound Gaming Headset for PS4"
          value={productDetails.productName}
          onChange={handleInputData("productName")}
        />
      </div>

      <div className="flex space-x-6 mb-8">
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

      <label className="text-lg leading-7">Description</label>
      <div className="border-2 my-4">
        <textarea
          className="w-full h-full outline-none p-6 bg-bgWhite"
          maxLength={700}
          rows={6}
          value={productDetails.description}
          onChange={handleInputData("description")}
        />
      </div>
      <p className="text-textTetriary text-right mb-8">
        100 words (700 characters)
      </p>

      <div className="border-2 border-dashed my-4 h-80 mb-16 ">
        <label className="bg-bgWhite w-full h-full flex flex-col justify-center items-center space-y-3">
          <span class="text-base font-bold leading-normal text-purple">
            Upload Photos
          </span>
          <span class="text-base leading-normal">or just drag and drop</span>
          <span class="text-base font-bold leading-normal text-textTetriary">
            (Add at least 3 photos)
          </span>
          <input type="file" className="hidden" />
        </label>
      </div>

      <div className="flex space-x-6 text-lg font-bold leading-7">
        <Link
          to={myAccountPath + profilePath}
          className="flex-1 text-center border-4 py-3"
        >
          Cancel
        </Link>
        <button className="flex-1 bg-purple py-3 text-white" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StepOne;
