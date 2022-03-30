import { useState } from "react";
import CurrentPageNav from "../components/CurrentPageNav";
import StepOne from "../components/AddItemFormSteps/StepOne";
import StepTwo from "../components/AddItemFormSteps/StepTwo";
import StepThree from "../components/AddItemFormSteps/StepThree";

const AddItemPage = () => {
  const [step, setStep] = useState(1);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    description: "",
    startPrice: "",
    startDate: "",
    endDate: "",
    images: "",
    userId: "",
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
    console.log(productDetails);

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

  const renderSwitch = () => {
    switch (step) {
      case 1:
        return (
          <StepOne
            nextStep={nextStep}
            handleInputData={handleInputData}
            productDetails={productDetails}
            setProductDetails={setProductDetails}
          />
        );
      case 2:
        return (
          <StepTwo
            nextStep={nextStep}
            prevStep={prevStep}
            handleInputData={handleInputData}
            productDetails={productDetails}
          />
        );
      case 3:
        return (
          <StepThree
            nextStep={nextStep}
            prevStep={prevStep}
            handleInputData={handleInputData}
            productDetails={productDetails}
          />
        );
    }
  };

  return (
    <>
      <CurrentPageNav title="Seller" />
      <div className="flex w-full justify-center items-center">
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
