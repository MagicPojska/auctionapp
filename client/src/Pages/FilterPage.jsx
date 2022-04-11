import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoriesAccordion from "../components/ShopPage/CategoriesAccordion";
import FilterProductsGrid from "../components/ShopPage//FilterProductsGrid";
import {
  getCategoriesList,
  getProductPriceRange,
  getProductsByCategory,
} from "../utilities/productsApi";
import SelectedFilters from "../components/ShopPage/SelectedFilters";
import PriceRangeSlider from "../components/ShopPage/PriceRangeSlider";
import { GRID, LIST, SORT_BY } from "../utilities/constants";
import Select from "react-select";
import { customStyles } from "../utilities/selectStyle";
import { BsGrid3X3, BsList } from "react-icons/bs";
import FilterProductsList from "../components/ShopPage/FilterProductsList";
import LoadingSpinner from "../components/LoadingSpinner";
import { categoriesPath, shopPath } from "../utilities/paths";

const FilterPage = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [previewType, setPreviewType] = useState(GRID);

  //Had to lift up the state so it can be passed down to selectedFilters component and to update products with price range when changing subCategories
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [minProductPrice, setMinProductPrice] = useState("");
  const [maxProductPrice, setMaxProductPrice] = useState("");

  const { id } = useParams();
  const { query } = useParams();

  const PAGE_SIZE = 9;

  useEffect(() => {
    getCategories();

    (async () => {
      const response = await getProductPriceRange();
      setMinProductPrice(parseFloat(response.data.min));
      setMaxProductPrice(parseFloat(response.data.max));
    })();
  }, []);

  useEffect(() => {
    getProducts(0, subCategories, minValue, maxValue, query, sortBy);
  }, [subCategories, sortBy, query]);

  const getCategories = async () => {
    try {
      const response = await getCategoriesList();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (
    page,
    subcategoryId,
    lowPrice = "",
    highPrice = "",
    searchTerm = query,
    sortBy = ""
  ) => {
    try {
      setIsLoading(true);

      const response = await getProductsByCategory(
        page,
        PAGE_SIZE,
        subcategoryId,
        lowPrice,
        highPrice,
        typeof searchTerm !== "undefined" ? searchTerm : "",
        sortBy
      );

      setSuggestion(response.data.suggestion);
      if (page === 0) {
        setProducts(response.data.products.content);
      } else {
        setProducts([...products, ...response.data.products.content]);
      }

      setHasMore(!response.data.products.last);
      setPageNumber(page);
      setIsLoading(false);
    } catch (error) {
      setProducts([]);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    await getProducts(
      pageNumber + 1,
      subCategories,
      minValue,
      maxValue,
      query,
      sortBy
    );
  };

  const handleSortChange = (selectedOption) => {
    setSortBy({
      ...sortBy,
      sortCriterium: selectedOption.sortBy,
      sortOrder: selectedOption.orderBy,
    });
  };

  return (
    <div className=" ">
      {suggestion.length > 0 && (
        <div className="w-full pl-[27rem] 2xl:pl-[34rem] bg-bgWhite py-5">
          <div className="text-textTetriary">
            Did you mean:{" "}
            <Link
              to={categoriesPath + "/search/" + suggestion}
              className="text-purple"
            >
              {suggestion}
            </Link>
          </div>
        </div>
      )}

      {typeof query !== "undefined" && (
        <div className="mx-40 2xl:mx-72 flex font-normal text-textTetriary p-6">
          <span>Home &nbsp;</span>
          <p>&#10132; &nbsp;</p>
          <span className="text-purple font-bold">
            Search results for {query}
          </span>
        </div>
      )}

      <div className="flex justify-between mx-40 2xl:mx-72">
        <div>
          <div className="w-64 min-w-max h-max border-2 p-6">
            <h3 className="text-base font-bold text-purple mb-8">
              PRODUCT CATEGORIES
            </h3>
            {categories.map((item) => (
              <CategoriesAccordion
                key={item.id}
                categories={categories}
                subCategories={subCategories}
                setSubCategories={setSubCategories}
                item={item}
                id={id}
              />
            ))}
          </div>

          <PriceRangeSlider
            onChange={getProducts}
            subCategories={subCategories}
            minValue={minValue}
            setMinValue={setMinValue}
            maxValue={maxValue}
            setMaxValue={setMaxValue}
            minProductPrice={minProductPrice}
            maxProductPrice={maxProductPrice}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between ml-6 mb-8">
            <Select
              defaultValue={SORT_BY[0]}
              onChange={handleSortChange}
              options={SORT_BY}
              className="w-64"
              styles={customStyles}
              isSearchable={false}
              components={{
                IndicatorSeparator: () => null,
              }}
            />

            <div className="flex space-x-5 text-textTetriary">
              <button
                onClick={() => setPreviewType(GRID)}
                className={`flex items-center space-x-2 ${
                  previewType === GRID && "text-purple"
                }`}
              >
                <BsGrid3X3 /> <span>Grid</span>
              </button>
              <button
                onClick={() => setPreviewType(LIST)}
                className={`flex items-center space-x-2 ${
                  previewType === LIST && "text-purple"
                }`}
              >
                <BsList /> <span>List</span>
              </button>
            </div>
          </div>

          <SelectedFilters
            categories={categories}
            subCategories={subCategories}
            setSubCategories={setSubCategories}
            minValue={minValue}
            setMinValue={setMinValue}
            maxValue={maxValue}
            setMaxValue={setMaxValue}
            getProducts={getProducts}
          />

          {previewType === GRID ? (
            <FilterProductsGrid products={products} isLoading={isLoading} />
          ) : (
            <FilterProductsList products={products} isLoading={isLoading} />
          )}

          <div className="w-full flex justify-center mt-20">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <button
                className={`py-4 px-14 bg-purple text-white text-base font-bold leading-7 ${
                  hasMore ? "" : "hidden"
                }`}
                onClick={loadMoreProducts}
              >
                Explore More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
