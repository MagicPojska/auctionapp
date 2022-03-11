import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import FilterProductsGrid from "../components/FilterProductsGrid";
import { getCategoriesList, getProductsByCategory } from "../utilities/api";
import { categoriesPath, shopProductPath } from "../utilities/paths";

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
  }, [location, superCategoryList]);

  const getCategories = async () => {
    try {
      const response = await getCategoriesList();
      setCategories(response.data);

      //Maps trough all the categories and makes a new object literal with key value paires where each subcategory will have its supercategory
      setSuperCategoryList(
        response.data
          .map((item) => {
            if (item.supercategoryId) {
              return {
                subcategoryId: item.id,
                supercategoryId: item.supercategoryId,
              };
            }
            return;
          })
          .filter((item) => item !== undefined)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (page) => {
    try {
      console.log("supercategorylist:", superCategoryList);
      const supercategoryIds = getCategoryPairs(superCategoryList);

      const response = await getProductsByCategory(
        page,
        PAGE_SIZE,
        supercategoryIds
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

  const getCategoryPairs = (categoryList) => {
    //This returns supercategory from list of key value paires from superCategories object literal with subcategoryId and supercategoryId
    return categoryList
      .map((item) => {
        if (item.supercategoryId == id) {
          return item.subcategoryId;
        }
      })
      .filter((item) => item !== undefined);
  };

  return (
    <div className="mx-40 2xl:mx-72 flex justify-between">
      <div className="w-64 min-w-max h-max border-2 p-6">
        <h3 className="text-base font-bold text-purple">PRODUCT CATEGORIES</h3>
        {categories.map(
          (item) =>
            item.supercategoryId === null && (
              <div className="bg-white h-14  flex items-center" key={item.id}>
                <Link
                  to={`${categoriesPath}/${item.id}`}
                  className="text-base leading-6 font-normal"
                >
                  {item.categoryName}
                </Link>
              </div>
            )
        )}
      </div>

      <FilterProductsGrid
        products={products}
        loadMoreProducts={loadMoreProducts}
        hasMore={hasMore}
      />
    </div>
  );
};

export default FilterPage;
