import { Link } from "react-router-dom";
import { shopProductPath } from "../utilities/paths";
import LoadingSpinner from "./LoadingSpinner";

const FilterProductsGrid = ({ products, isLoading }) => {
  return products.length !== 0 ? (
    <div className="ml-6">
      <div className="grid grid-cols-3 gap-x-4 gap-y-8">
        {products.map((item) => (
          <Link
            to={`${shopProductPath}/${item.id}`}
            className="flex flex-col"
            key={item.id}
          >
            <img
              src={item.images.split(",")[0]}
              className="object-cover aspect-[3/4]"
              alt=""
            />
            <h4 className="mt-3 text-2xl leading-6 font-semibold mb-2">
              {item.productName}
            </h4>
            <p className="text-l leading-6 font-normal text-textTetriary">
              Start From&nbsp;
              <span className="text-purple font-bold">
                ${parseFloat(item.startPrice).toFixed(2)}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full flex justify-center mt-10 text-2xl leading-6 font-bold">
      {isLoading ? <LoadingSpinner /> : <span>No products to show</span>}
    </div>
  );
};

export default FilterProductsGrid;
