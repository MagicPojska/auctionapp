import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesAccordion from "../components/CategoriesAccordion";
import FilterProductsGrid from "../components/FilterProductsGrid";
import {
  getCategoriesList,
  getProductPriceRange,
  getProductsByCategory,
} from "../utilities/productsApi";
import SelectedFilters from "../components/SelectedFilters";
import PriceRangeSlider from "../components/PriceRangeSlider";

const FilterPage = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);

  //Had to lift up the state so it can be passed down to selectedFilters component and to update products with price range when changing subCategories
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const { id } = useParams();

  const PAGE_SIZE = 9;

  useEffect(() => {
    getCategories();

    (async () => {
      const response = await getProductPriceRange();
      setMin(parseFloat(response.data.min));
      setMax(parseFloat(response.data.max));
    })();
  }, []);

  useEffect(() => {
    subCategories.length > 0
      ? getProducts(0, subCategories, minValue, maxValue)
      : setProducts([]);
  }, [subCategories]);

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
    highPrice = ""
  ) => {
    try {
      setIsLoading(true);

      const response = await getProductsByCategory(
        page,
        PAGE_SIZE,
        subcategoryId,
        lowPrice,
        highPrice
      );

      if (page === 0) {
        setProducts(response.data.content);
      } else {
        setProducts([...products, ...response.data.content]);
      }

      setHasMore(!response.data.last);
      setPageNumber(page);
      setIsLoading(false);
    } catch (error) {
      setProducts([]);
      console.log(error);
    }
  };

  const loadMoreProducts = async () => {
    await getProducts(pageNumber + 1, subCategories);
  };

  return (
    <div className="mx-40 2xl:mx-72 flex justify-between">
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
          getProducts={getProducts}
          subCategories={subCategories}
          minValue={minValue}
          setMinValue={setMinValue}
          maxValue={maxValue}
          setMaxValue={setMaxValue}
          min={min}
          max={max}
        />
      </div>

      <div className="flex flex-col w-full">
        <div className="w-24 mb-8 px-6">
          <select name="sorting">
            <option value="productName">Default Sorting</option>
            <option value="startDate">Added: New to Old</option>
            <option value="endDate">Time left</option>
            <option value="startPrice">Price: Low to High</option>
            <option value="highPrice">Price: High to Low</option>
          </select>
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

        <FilterProductsGrid
          products={products}
          loadMoreProducts={loadMoreProducts}
          hasMore={hasMore}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default FilterPage;
