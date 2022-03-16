import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesAccordion from "../components/CategoriesAccordion";
import FilterProductsGrid from "../components/FilterProductsGrid";
import {
  getCategoriesList,
  getProductsByCategory,
} from "../utilities/productsApi";

const FilterPage = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);

  const { id } = useParams();

  const PAGE_SIZE = 9;

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    subCategories.length > 0 && getProducts(0, subCategories);
  }, [subCategories]);

  const getCategories = async () => {
    try {
      const response = await getCategoriesList();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (page, subcategoryId) => {
    try {
      setIsLoading(true);

      const response = await getProductsByCategory(
        page,
        PAGE_SIZE,
        subcategoryId
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
      <FilterProductsGrid
        products={products}
        loadMoreProducts={loadMoreProducts}
        hasMore={hasMore}
        isLoading={isLoading}
      />
    </div>
  );
};

export default FilterPage;
