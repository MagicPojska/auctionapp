import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategoriesList, getProductsByCategory } from "../utilities/api";
import { shopProductPath } from "../utilities/paths";

const FilterPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const { id } = useParams();

  let superCategories;

  const pageSize = 9;

  useEffect(() => {
    (async () => {
      await getCategories();
      await getProductsCategory();
    })();
  }, []);

  const getProductsCategory = async () => {
    try {
      //This returns supercategory from list of key value paires from superCategories object literal with subcategoryId and supercategoryId
      const supercategoryIds = superCategories
        .map((item) => {
          if (item.supercategoryId == id) {
            return item.subcategoryId;
          }
        })
        .filter((item) => item !== undefined);

      const response = await getProductsByCategory(
        0,
        pageSize,
        supercategoryIds
      );

      setProducts(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await getCategoriesList();
      setCategories(response.data);

      //Maps trough all the categories and makes a new object literal with key value paires where each subcategory will have its supercategory
      superCategories = response.data
        .map((item) => {
          if (item.supercategoryId) {
            return {
              subcategoryId: item.id,
              supercategoryId: item.supercategoryId,
            };
          }
          return;
        })
        .filter((item) => item !== undefined);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-40 2xl:mx-72 flex justify-between">
      <div className="w-64 min-w-max border-2 p-6">
        <h3 className="text-base font-bold text-purple">PRODUCT CATEGORIES</h3>
        {categories.map(
          (item) =>
            item.supercategoryId === null && (
              <div className="bg-white h-14  flex items-center" key={item.id}>
                <p className="text-base leading-6 font-normal">
                  {item.categoryName}
                </p>
              </div>
            )
        )}
      </div>
      <div className="ml-6 ">
        <div className="grid grid-cols-3 gap-x-4 gap-y-8">
          {products.map((item) => (
            <Link
              to={`${shopProductPath}/${item.id}`}
              className="flex flex-col"
              key={item.id}
            >
              <img
                src={item.images.split(",")[0]}
                className="object-cover aspect-[3/4]"
                alt=""
              />
              <h4 className="mt-3 text-2xl leading-6 font-semibold mb-2">
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
      </div>
    </div>
  );
};

export default FilterPage;
