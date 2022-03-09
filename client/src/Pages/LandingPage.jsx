import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useLocation } from "react-router-dom";
import { getCategoriesList, getProductsSorted } from "../utilities/api";
import { BsChevronRight } from "react-icons/bs";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [highlightedProduct, setHighlightedProduct] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const pageSize = 8;

  useEffect(() => {
    (async () => {
      await getProductsFirstPage();
    })();
  }, [location]);

  useEffect(() => {
    (async () => {
      await getCategories();
    })();
  }, []);

  const getCategories = async () => {
    try {
      const response = await getCategoriesList();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsFirstPage = async () => {
    try {
      setPageNumber(0);
      const response = await getProductsSorted(pageNumber, pageSize, "endDate");
      setPageNumber(1);

      setProducts(response.data.content);
      setHighlightedProduct(response.data.content[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreProducts = async (sortBy) => {
    try {
      const response = await getProductsSorted(pageNumber, pageSize, sortBy);
      setProducts([...products, ...response.data.content]);

      if (response.data.last) {
        setHasMore(false);
      }
      setPageNumber(pageNumber + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const goNext = async () => {
    await getMoreProducts("endDate");
  };

  return (
    <div>
      <div className="px-[162px] pt-4 h-[38rem] bg-bgWhite flex justify-between">
        <div className="h-full">
          <h3 className="text-base leading-5 font-bold ml-4 mb-4 text-purple">
            CATEGORIES
          </h3>
          <div className="h-[31rem] w-64 2xl:w-80 overflow-y-scroll scrollbar">
            {categories.map((item) => (
              <div
                className="bg-white h-14  flex p-4 border-b-[1px] border-gray-300 items-center"
                key={item.id}
              >
                <Link
                  to={`/product/category/${item.categoryName.toLowerCase()}`}
                  className="text-base leading-6 font-normal"
                >
                  {item.categoryName}
                </Link>
              </div>
            ))}
          </div>
          <div className="bg-white h-14 w-64 flex p-4 border-b-[1px] border-gray-300 items-center">
            <Link
              to={`/product/categories`}
              className="text-base leading-6 font-normal"
            >
              All Categories
            </Link>
          </div>
        </div>

        <div className="my-24 w-[46rem] 2xl:w-[56rem] flex">
          <div className="flex flex-col">
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
              to="/bid"
              className="mt-auto flex border-4 border-purple w-44 h-14 justify-center items-center leading-7 text-base font-bold"
            >
              BID NOW &nbsp;&nbsp;{" "}
              <BsChevronRight className="stroke-2 text-xs" />
            </Link>
          </div>

          <img
            src={highlightedProduct.images}
            alt=""
            className="h-[26rem] w-[22rem] 2xl:w-[32rem] object-cover"
          />
        </div>
      </div>

      <div className="mx-[162px] mt-7">
        <div className="border-b-2">
          <span className="">New Arrivals</span>
          <span>Last Chance</span>
        </div>

        <InfiniteScroll
          dataLength={products.length} //This is important field to render the next data
          next={goNext}
          hasMore={hasMore}
        >
          <div className="grid grid-cols-4 gap-x-4 gap-y-8 mt-8">
            {products.map((item) => (
              <Link
                to={`/shop/product/${item.id}`}
                className="flex flex-col"
                key={item.id}
              >
                <img
                  src={highlightedProduct.images}
                  className="object-cover aspect-square"
                  alt=""
                />
                <h4 className="mt-3 text-2xl leading-6 font-semibold">
                  {highlightedProduct.productName}
                </h4>
                <p className="text-l leading-6 font-normal text-textTetriary">
                  Start From&nbsp;
                  <span className="text-purple font-bold">
                    ${parseFloat(highlightedProduct.startPrice).toFixed(2)}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default LandingPage;
