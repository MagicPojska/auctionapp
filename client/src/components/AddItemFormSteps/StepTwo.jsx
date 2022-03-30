import { Link } from "react-router-dom";
import { myAccountPath, profilePath } from "../../utilities/paths";

const StepTwo = ({ nextStep, prevStep }) => {
  return (
    <div className="border-2 pb-16 font-normal">
      <div className="py-6 bg-bgWhite mb-12">
        <h2 className="text-center text-2xl font-bold leading-7">SET PRICES</h2>
      </div>
      <div className="px-24">
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
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
