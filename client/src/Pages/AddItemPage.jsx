import { useState } from "react";
import CurrentPageNav from "../components/CurrentPageNav";
import StepOne from "../components/AddItemFormSteps/StepOne";
import StepTwo from "../components/AddItemFormSteps/StepTwo";
import StepThree from "../components/AddItemFormSteps/StepThree";
import moment from "moment";
import { useUserContext } from "../contexts/UserContextProvider";

const AddItemPage = () => {
  const { user } = useUserContext();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState(null);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    description: "",
    startPrice: "",
    startDate: moment().format("YYYY-MM-DD"),
    endDate: "",
    images: "",
    address: "",
    email: "",
    city: "",
    zipCode: "",
    country: "",
    phone: "",
    userId: user.id,
    categoryId: "",
  });

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

    console.log(productDetails);
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

  const renderSwitch = () => {
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
        {renderSwitch()}
      </div>
    </>
  );
};

export default AddItemPage;
