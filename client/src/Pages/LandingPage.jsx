import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useLocation } from "react-router-dom";
import { getCategoriesList, getProductsSorted } from "../utilities/api";
import { shopProductPath } from "../utilities/paths";
import LandingPageCategories from "../components/LandingPageCategories";
import HighlightedProduct from "../components/HighlightedProduct";
import LandingPageItems from "../components/LandingPageItems";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [highlightedProduct, setHighlightedProduct] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [categories, setCategories] = useState([]);

  const START_DATE = "startDate";
  const END_DATE = "endDate";
  const [sort, setSort] = useState(START_DATE);

  const location = useLocation();

  const PAGE_SIZE = 8;

  useEffect(() => {
    getProducts(sort, 0);
  }, [location, sort]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getCategoriesList();
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const getProducts = async (sort, page) => {
    try {
      const response = await getProductsSorted(page, PAGE_SIZE, sort);
      if (page === 0) {
        setHasMore(true);
        setProducts([]);
        setProducts(response.data.content);
      } else {
        setProducts([...products, ...response.data.content]);
      }

      if (!highlightedProduct) {
        setHighlightedProduct(response.data.content[0]);
      }
      if (response.data.last) {
        setHasMore(false);
      }
      setPageNumber(page);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNextPage = async () => {
    await getProducts(sort, pageNumber + 1);
  };

  return (
    <>
      <div className="px-40 2xl:px-72 pt-4 h-[39rem] bg-bgWhite flex justify-between">
        <LandingPageCategories categories={categories} />

        <HighlightedProduct highlightedProduct={highlightedProduct} />
      </div>

      <div className="mx-40 2xl:mx-72 mt-16">
        <div className="border-b-2">
          <div className="space-x-12 text-xl leading-6 font-normal">
            <button
              className={`pb-4  ${
                sort === START_DATE ? "border-b-[3px] border-purple" : ""
              }`}
              onClick={() => {
                setSort(START_DATE);
              }}
            >
              New Arrivals
            </button>
            <button
              className={`pb-4  ${
                sort === END_DATE ? "border-b-[3px] border-purple" : ""
              }`}
              onClick={() => {
                setSort(END_DATE);
              }}
            >
              Last Chance
            </button>
          </div>
        </div>

        <LandingPageItems
          products={products}
          hasMore={hasMore}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </>
  );
};

export default LandingPage;
