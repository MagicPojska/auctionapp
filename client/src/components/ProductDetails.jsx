import React from "react";
import { BsChevronRight } from "react-icons/bs";
import { useUserContext } from "../contexts/UserContextProvider";

const ProductDetails = ({ product, timeLeft }) => {
  const { user } = useUserContext();
  return (
    <div className="w-1/2">
      <h1 className="text-3xl font-normal mb-4">{product.productName}</h1>
      <p className="text-base font-light mb-4 text-purple">
        Starts from <span className="font-bold">${product.startPrice}</span>
      </p>
      <div className="text-base font-light py-6 px-9 border-2 space-y-4 mb-16 w-fit">
        <p>
          Highest bid:{" "}
          <span className="font-bold text-purple">${product.startPrice}</span>
        </p>
        <p>
          Number of bids: <span className="font-bold text-purple">0</span>
        </p>
        <p>
          Time left:{" "}
          <span className="font-bold text-purple">
            {timeLeft.weeks} Weeks {timeLeft.days} Days
          </span>
        </p>
      </div>

      <div className="flex">
        <input
          type="text"
          className="border-2 py-3 px-8 mr-6 w-4/6 focus:outline-none"
          placeholder={`Enter $${product.startPrice} or higher`}
        />
        <button
          className={`mt-auto flex border-4 border-purple w-48 h-14 justify-center items-center leading-7 text-base font-bold ${
            !user && "opacity-25"
          }`}
          disabled={!user && true}
        >
          PLACE BID &nbsp;&nbsp; <BsChevronRight className="stroke-2 text-xs" />
        </button>
      </div>

      <div>
        <div className="border-b-2 mt-16">
          <div className="space-x-12 text-xl leading-6 font-normal text-purple">
            <button
              className="pb-4  
                 border-b-[3px] border-purple px-6"
            >
              Details
            </button>
          </div>
        </div>

        <div className="mt-8 text-base leading-6 font-normal text-textTetriary">
          <span>Note:</span>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
