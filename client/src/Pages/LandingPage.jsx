import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useLocation } from "react-router-dom";
import { getCategoriesList, getProductsSorted } from "../utilities/api";
import { BsChevronRight } from "react-icons/bs";
import { categoriesPath, shopProductPath } from "../utilities/paths";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [highlightedProduct, setHighlightedProduct] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [categories, setCategories] = useState([]);

  const startDate = "startDate";
  const endDate = "endDate";
  const [sort, setSort] = useState(startDate);

  const location = useLocation();

  const pageSize = 8;

  useEffect(() => {
    (async () => {
      await getProductsFirstPage(sort);
    })();
  }, [location, sort]);

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

  const getProductsFirstPage = async (sort = startDate) => {
    try {
      const response = await getProductsSorted(0, pageSize, sort);

      setProducts(response.data.content);
      setHasMore(true);
      setPageNumber(1);
      if (!highlightedProduct) {
        setHighlightedProduct(response.data.content[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMoreProducts = async (sort) => {
    try {
      const response = await getProductsSorted(pageNumber, pageSize, sort);
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
    await getMoreProducts(sort);
  };

  return (
    <>
      <div className="px-40 2xl:px-72 pt-4 h-[39rem] bg-bgWhite flex justify-between">
        <div className="h-full">
          <h3 className="text-base leading-5 font-bold ml-4 mb-4 text-purple">
            CATEGORIES
          </h3>
          <div className="h-[32rem] w-64 overflow-y-scroll scrollbar">
            {categories.map((item) => (
              <div
                className="bg-white h-14  flex p-4 border-b-[1px] border-gray-300 items-center"
                key={item.id}
              >
                <Link
                  to={`${categoriesPath}/${item.categoryName.toLowerCase()}`}
                  className="text-base leading-6 font-normal"
                >
                  {item.categoryName}
                </Link>
              </div>
            ))}
          </div>
          <div className="bg-white h-14 w-64 flex p-4 border-b-[1px] border-gray-300 items-center">
            <Link
              to={categoriesPath}
              className="text-base leading-6 font-normal"
            >
              All Categories
            </Link>
          </div>
        </div>

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
              BID NOW &nbsp;&nbsp;{" "}
              <BsChevronRight className="stroke-2 text-xs" />
            </Link>
          </div>

          <img
            src={highlightedProduct.images}
            alt=""
            className="h-[26rem] w-[22rem] object-cover"
          />
        </div>
      </div>

      <div className="mx-40 2xl:mx-72 mt-16">
        <div className="border-b-2">
          <div className="space-x-12 text-xl leading-6 font-normal">
            <button
              className={`pb-4  ${
                sort === startDate ? "border-b-[3px] border-purple" : ""
              }`}
              onClick={() => {
                setSort(startDate);
              }}
            >
              New Arrivals
            </button>
            <button
              className={`pb-4  ${
                sort === endDate ? "border-b-[3px] border-purple" : ""
              }`}
              onClick={() => {
                setSort(endDate);
              }}
            >
              Last Chance
            </button>
          </div>
        </div>

        <InfiniteScroll
          dataLength={products.length} //This is important field to render the next data
          next={goNext}
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
      </div>
    </>
  );
};

export default LandingPage;
