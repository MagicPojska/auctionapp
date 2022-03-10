import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoriesList } from "../utilities/api";

const FilterPage = () => {
  const [categories, setCategories] = useState([]);
  const { id } = useParams();

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

  return (
    <div className="mx-40 2xl:mx-72">
      <div className="w-64 border-2 p-6">
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
      <div></div>
    </div>
  );
};

export default FilterPage;
