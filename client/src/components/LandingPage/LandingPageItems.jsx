import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { shopProductPath } from "../../utilities/paths";

const LandingPageItems = ({ products, fetchNextPage, hasMore }) => {
  return (
    <InfiniteScroll
      dataLength={products.length} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={hasMore}
    >
      <div className="grid grid-cols-4 gap-x-4 gap-y-8 mt-8">
        {products.map((item) => (
          <Link
            to={`${shopProductPath}/${item.id}`}
            className="flex flex-col"
            key={item.id}
          >
            <img
              src={item.images.split(",")[0]}
              className="object-cover aspect-square"
              alt=""
            />
            <h4 className="mt-3 text-2xl leading-6 font-semibold">
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
    </InfiniteScroll>
  );
};

export default LandingPageItems;
