import { Link } from "react-router-dom";
import { shopProductPath } from "../utilities/paths";
import LoadingSpinner from "./LoadingSpinner";
import { AiOutlineHeart, AiOutlineDollarCircle } from "react-icons/ai";

const FilterProductsList = ({ products, isLoading }) => {
  return products.length !== 0 ? (
    <div className="ml-6 grid gap-6">
      {products.map((product) => (
        <div key={product.id} className="flex space-x-5">
          <Link to={`${shopProductPath}/${product.id}`}>
            <img
              src={product.images.split(",")[0]}
              className="object-cover aspect-[5/7] h-[22rem] 2xl:h-96 min-w-fit"
              alt=""
            />
          </Link>
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-2xl leading-6 font-semibold mb-4">
                {product.productName}
              </h4>
              <p className="text-base leading-6 font-normal text-textTetriary">
                {product.description}
              </p>
            </div>
            <div>
              <p className="text-3xl font-light text-purple mb-12">
                Start from <span>${product.startPrice}</span>
              </p>
              <div className="flex space-x-3">
                <button className="p-2 border-2 flex items-center space-x-2">
                  <span>Wishlist</span>
                  <AiOutlineHeart />
                </button>
                <Link
                  to={`${shopProductPath}/${product.id}`}
                  className="p-2 border-2 font-normal flex items-center space-x-2"
                >
                  <span>Bid</span> <AiOutlineDollarCircle />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="w-full flex justify-center mt-10 text-2xl leading-6 font-bold">
      {isLoading ? <LoadingSpinner /> : <span>No products to show</span>}
    </div>
  );
};

export default FilterProductsList;
