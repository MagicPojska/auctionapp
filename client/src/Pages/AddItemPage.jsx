import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentPageNav from "../components/CurrentPageNav";
import StepOne from "../components/MyAccount/AddItemFormSteps/StepOne";
import StepTwo from "../components/MyAccount/AddItemFormSteps/StepTwo";
import StepThree from "../components/MyAccount/AddItemFormSteps/StepThree";
import moment from "moment";
import { toast } from "react-toastify";
import { addProduct } from "../utilities/productsApi";
import { DATETIME_FORMAT } from "../utilities/constants";
import { uploadImage } from "../utilities/imageApi";
import { useUserContext } from "../contexts/UserContextProvider";
import { shopProductPath } from "../utilities/paths";

const AddItemPage = () => {
  const { user } = useUserContext();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    description: "",
    startPrice: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().add(7, "days").format("YYYY-MM-DD"),
    images: "",
    address: "",
    email: "",
    city: "",
    zipCode: "",
    country: "",
    phone: "",
    userId: "",
    categoryId: "",
  });

  const [cardDetails, setCardDetails] = useState({
    cardHolderName: "",
    cardNumber: "",
    expirationYear: "",
    expirationMonth: "",
    cvc: "",
  });

  const navigate = useNavigate();

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleInputData = (input) => (e) => {
    const { value } = e.target;

    setProductDetails((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const renderPurpleDot = () => (
    <div className="w-8 h-8 rounded-full shadow-xl flex justify-center items-center">
      <div className="w-4 h-4 rounded-full bg-purple"></div>
    </div>
  );

  const renderHollowDot = () => (
    <div className="w-8 h-8 rounded-full shadow-xl flex justify-center items-center">
      <div className="w-4 h-4 rounded-full border-2 border-purple"></div>
    </div>
  );

  const handlePostItem = async () => {
    setIsLoading(true);
    let imageUrls = [];
    try {
      for (let i = 0; i < images.length; i++) {
        const imageData = new FormData();
        imageData.append("file", images[i]);
        imageData.append(
          "upload_preset",
          process.env.REACT_APP_CLOUDINARY_PRESET_NAME
        );

        const response = await uploadImage(imageData);

        imageUrls.push(response.data.url);
      }

      let formData;
      if (
        productDetails.address &&
        productDetails.city &&
        productDetails.zipCode &&
        productDetails.country &&
        productDetails.phone &&
        productDetails.email
      ) {
        formData = productDetails;
        formData.images = imageUrls.join();
        formData.startDate = moment(productDetails.startDate).format(
          DATETIME_FORMAT
        );
        formData.endDate = moment(productDetails.endDate).format(
          DATETIME_FORMAT
        );
        formData.userId = user.id;
      } else {
        toast.error("Please fill in all the required fields", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }

      if (
        cardDetails.cardHolderName &&
        cardDetails.cardNumber &&
        cardDetails.expirationYear &&
        cardDetails.expirationMonth &&
        cardDetails.cvc
      ) {
        if (
          cardDetails.expirationYear === moment().year() &&
          cardDetails.expirationMonth <= moment().month() + 1
        ) {
          toast.error("Please enter an unexpired card", {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        } else {
          toast.error("Please all card details", {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }

        formData.card = cardDetails;
      }

      const res = await addProduct(formData);
      navigate(`${shopProductPath}/${res.data.id}`);
    } catch (error) {
      setIsLoading(false);
      toast.error("Adding new product failed, please try again", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            nextStep={nextStep}
            handleInputData={handleInputData}
            productDetails={productDetails}
            setProductDetails={setProductDetails}
            setImages={setImages}
            images={images}
          />
        );
      case 2:
        return (
          <StepTwo
            nextStep={nextStep}
            prevStep={prevStep}
            handleInputData={handleInputData}
            setProductDetails={setProductDetails}
            productDetails={productDetails}
          />
        );
      case 3:
        return (
          <StepThree
            prevStep={prevStep}
            handleInputData={handleInputData}
            productDetails={productDetails}
            setProductDetails={setProductDetails}
            cardDetails={cardDetails}
            setCardDetails={setCardDetails}
            handlePostItem={handlePostItem}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <>
      <CurrentPageNav title="Seller" />
      <div className="flex w-full justify-center items-center mt-10">
        {renderPurpleDot()}
        <hr className="w-20" />
        {step === 2 || step === 3 ? renderPurpleDot() : renderHollowDot()}
        <hr className="w-20" />
        {step === 3 ? renderPurpleDot() : renderHollowDot()}
      </div>
      <div className="w-[46rem] mx-auto mt-12 justify-center">
        {renderStep()}
      </div>
    </>
  );
};

export default AddItemPage;
