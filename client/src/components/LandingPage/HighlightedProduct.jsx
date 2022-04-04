import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { shopProductPath } from "../../utilities/paths";

const HighlightedProduct = ({ highlightedProduct }) => {
  return (
    <div className="my-24 w-[46rem] 2xl:w-[50rem] flex ml-5">
      <div className="flex flex-col mr-3">
        <h2 className="text-3xl leading-10 font-normal mb-4">
          {highlightedProduct.productName}
        </h2>
        <span className="text-3xl leading-10 font-normal text-purple mb-4">
          Start From ${parseFloat(highlightedProduct.startPrice).toFixed(2)}
        </span>
        <p className="text-base leading-6 font-normal text-textTetriary">
          {highlightedProduct.description}
        </p>
        <Link
          to={`${shopProductPath}/${highlightedProduct.id}`}
          className="mt-auto flex border-4 border-purple w-48 h-14 justify-center items-center leading-7 text-base font-bold"
        >
          BID NOW &nbsp;&nbsp; <BsChevronRight className="stroke-2 text-xs" />
        </Link>
      </div>

      <img
        src={highlightedProduct.images}
        alt=""
        className="h-[26rem] w-[22rem] object-cover"
      />
    </div>
  );
};

export default HighlightedProduct;
