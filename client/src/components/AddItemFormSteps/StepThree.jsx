import { Link } from "react-router-dom";
import { myAccountPath, profilePath } from "../../utilities/paths";

const StepThree = ({ prevStep }) => {
  return (
    <div className="border-2 px-24 pb-16 font-normal">
      <div className="py-6 bg-bgWhite mb-12">
        <h2 className="text-center text-2xl font-bold leading-7">
          LOCATION AND SHIPPING
        </h2>
      </div>

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
          <button className="flex-1 bg-purple py-3 text-white">Done</button>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
