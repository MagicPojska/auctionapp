import { AiOutlineCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { myAccountPath, profilePath } from "../../utilities/paths";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const StepTwo = ({
  nextStep,
  prevStep,
  setProductDetails,
  productDetails,
  handleInputData,
}) => {
  const changeStartDate = (e) => {
    const startDateInput = moment(e.target.value).format("YYYY-MM-DD");

    setProductDetails({
      ...productDetails,
      startDate: startDateInput,
      endDate: moment(startDateInput).add(7, "days").format("YYYY-MM-DD"),
    });
  };

  const changeEndDate = (e) => {
    const endDateInput = moment(e.target.value).format("YYYY-MM-DD");

    setProductDetails({ ...productDetails, endDate: endDateInput });
  };

  const validateDataAndNavigateToNextStep = () => {
    productDetails.startPrice &&
    productDetails.startDate &&
    productDetails.endDate
      ? nextStep()
      : toast.error("Please add all the details!", {
          position: toast.POSITION.TOP_CENTER,
        });
  };

  return (
    <div className="border-2 pb-16 font-normal">
      <div className="py-6 bg-bgWhite mb-12">
        <h2 className="text-center text-2xl font-bold leading-7">SET PRICES</h2>
      </div>
      <div className="px-24">
        <label className="text-lg leading-7">Your start price</label>
        <div className="border-2 h-16 mb-8 mt-4 flex bg-bgWhite">
          <div className="w-16 border-r-2 flex justify-center items-center">
            $
          </div>
          <input
            type="number"
            className="w-full h-full outline-none px-6"
            onChange={handleInputData("startPrice")}
            value={productDetails.startPrice}
          />
        </div>

        <div className="flex space-x-6 mb-6">
          <div className="flex-1 border-2 h-16 p-6 flex justify-between items-center">
            <input
              type="date"
              required="required"
              className="flex-1 outline-none"
              value={productDetails.startDate}
              onChange={changeStartDate}
              min={moment().format("YYYY-MM-DD")}
            />
            <AiOutlineCalendar className="text-2xl" />
          </div>

          <div className="flex-1 border-2 h-16 p-6 flex justify-between items-center">
            <input
              type="date"
              required="required"
              className="flex-1 outline-none"
              value={productDetails.endDate}
              onChange={changeEndDate}
              min={productDetails.startDate}
            />
            <AiOutlineCalendar className="text-2xl" />
          </div>
        </div>

        <p className="text-textTetriary leading-6 mb-8">
          The auction will be automatically closed when the end time comes. The
          highest bid will win the auction.
        </p>

        <div className="flex space-x-6 text-lg font-bold leading-7 items-center">
          <div className="flex-1">
            <Link
              to={myAccountPath + profilePath}
              className="text-center border-4 py-3 px-8"
            >
              Cancel
            </Link>
          </div>
          <div className="flex-1 flex space-x-6">
            <button
              className="flex-1 bg-purple py-3 text-white"
              onClick={prevStep}
            >
              Back
            </button>
            <button
              className="flex-1 bg-purple py-3 text-white"
              onClick={validateDataAndNavigateToNextStep}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StepTwo;
