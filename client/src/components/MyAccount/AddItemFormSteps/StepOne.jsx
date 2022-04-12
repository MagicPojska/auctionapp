import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { getCategoriesList } from "../../../utilities/productsApi";
import { customStyles } from "../../../utilities/selectStyle";
import { myAccountPath, profilePath } from "../../../utilities/paths";
import { FileUploader } from "react-drag-drop-files";
import { PHOTO_TYPES } from "../../../utilities/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StepOne = ({
  nextStep,
  handleInputData,
  productDetails,
  setProductDetails,
  setImages,
  images,
}) => {
  const [allCategoriesList, setAllCategoriesList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getCategoriesList();
        setAllCategoriesList(response.data);
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
    setSubcategories(
      allCategoriesList
        .map((category) => ({
          value: category.id,
          label: category.categoryName,
          supercategoryId: category.supercategoryId,
        }))
        .filter((category) => category.supercategoryId === selectedOption.value)
    );
  };

  const handleSubcategoryChange = (selectedOption) => {
    setProductDetails({ ...productDetails, categoryId: selectedOption.value });
  };

  const handlePhotoChange = (photos) => {
    if (photos.length >= 3 && photos.length <= 5) {
      setImages(photos);

      const selectedFiles = [];
      const targetFileObject = [...photos];
      targetFileObject.map((file) => {
        return selectedFiles.push(URL.createObjectURL(file));
      });
      setImagePreview(selectedFiles);

      console.log(selectedFiles);
    } else {
      toast.error("Wrong number of pictures!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const validateDataAndNavigateToNextStep = () => {
    images !== null &&
    productDetails.categoryId &&
    productDetails.description &&
    productDetails.productName
      ? nextStep()
      : toast.error("Please add all the details!", {
          position: toast.POSITION.TOP_CENTER,
        });
  };

  return (
    <div className="border-2 pb-16 font-normal">
      <div className="py-6 bg-bgWhite mb-12">
        <h2 className="text-center text-2xl font-bold leading-7">ADD ITEM</h2>
      </div>
      <div className="px-24">
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

        <FileUploader
          handleChange={handlePhotoChange}
          multiple={true}
          name="photos"
          types={PHOTO_TYPES}
          onTypeError={() => {
            toast.error("Wrong file type!", {
              position: toast.POSITION.TOP_CENTER,
            });
          }}
        >
          <div className="border-2 border-dashed my-4 h-80 mb-16">
            {imagePreview.length > 0 ? (
              <label className="bg-bgWhite w-full h-full flex flex-col justify-center items-center space-y-3 cursor-pointer">
                <div className="p-12 grid grid-cols-3 gap-4">
                  {imagePreview.map((url, id) => (
                    <img
                      src={url}
                      className="object-cover h-24 w-24"
                      alt="uploaded image"
                      key={id}
                    />
                  ))}
                </div>
              </label>
            ) : (
              <label className="bg-bgWhite w-full h-full flex flex-col justify-center items-center space-y-3 cursor-pointer">
                <span className="text-base font-bold leading-normal text-purple">
                  Upload Photos
                </span>
                <span className="text-base leading-normal">
                  or just drag and drop
                </span>
                <span className="text-base font-bold leading-normal text-textTetriary">
                  (Add at least 3 photos)
                </span>
                <div className=""></div>
              </label>
            )}
          </div>
        </FileUploader>

        <div className="flex space-x-6 text-lg font-bold leading-7">
          <Link
            to={myAccountPath + profilePath}
            className="flex-1 text-center border-4 py-3"
          >
            Cancel
          </Link>
          <button
            className="flex-1 bg-purple py-3 text-white"
            onClick={validateDataAndNavigateToNextStep}
          >
            Next
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default StepOne;
