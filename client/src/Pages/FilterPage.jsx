import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CategoriesAccordion from "../components/CategoriesAccordion";
import FilterProductsGrid from "../components/FilterProductsGrid";
import { getCategoriesList, getProductsByCategory } from "../utilities/api";

const FilterPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [superCategoryList, setSuperCategoryList] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const { id } = useParams();
  const location = useLocation();

  const PAGE_SIZE = 9;

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts(0);
  }, [location, categories]);

  const getCategories = async () => {
    try {
      const response = await getCategoriesList();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (page) => {
    try {
      const subcategoryIds = getSubcategoryIds(categories);

      const response = await getProductsByCategory(
        page,
        PAGE_SIZE,
        subcategoryIds
      );
      if (page === 0) {
        setHasMore(true);
        setProducts([]);
        setProducts(response.data.content);
      } else {
        setProducts([...products, ...response.data.content]);
      }

      if (response.data.last) {
        setHasMore(false);
      }
      setPageNumber(page);
    } catch (error) {
      setProducts([]);
      console.log(error);
    }
  };

  const loadMoreProducts = async () => {
    await getProducts(pageNumber + 1);
  };

  const getSubcategoryIds = (categoryList) => {
    //This returns function returns all subcategoryIds that are part of supercategoryId that was provided in url
    return categoryList
      .map((item) => {
        if (item.supercategoryId == id) {
          return item.id;
        }
      })
      .filter((item) => item !== undefined);
  };

  return (
    <div className="mx-40 2xl:mx-72 flex justify-between">
      <CategoriesAccordion categories={categories} />

      <FilterProductsGrid
        products={products}
        loadMoreProducts={loadMoreProducts}
        hasMore={hasMore}
      />
    </div>
  );
};

export default FilterPage;
