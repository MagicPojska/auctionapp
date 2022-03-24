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
import { SORT_BY } from "../utilities/constants";
import Select from "react-select";
import { customStyles } from "../utilities/selectStyle";

const FilterPage = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortBy, setSortBy] = useState("");

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
      ? getProducts(0, subCategories, minValue, maxValue, sortBy)
      : setProducts([]);
  }, [subCategories, sortBy]);

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
        sortBy
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

  const handleSortChange = (selectedOption) => {
    setSortBy(selectedOption.value);
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
