import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { shopProductPath } from "../../utilities/paths";
import { getRelatedProducts } from "../../utilities/productsApi";

const RecomendedProducts = () => {
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getRelatedProducts(id);
      setRelatedProducts(response.data);
    })();
  }, []);
  return (
    <div className="mt-32">
      <h2 className="text-center font-bold text-2xl leading-7 mb-4">
        {relatedProducts.length > 0
          ? "Related Products"
          : "No related products"}
      </h2>
      <hr className="bg-black mb-12" />

      {relatedProducts.length > 0 && (
        <div className="grid grid-cols-3 gap-x-4 gap-y-8">
          {relatedProducts.map((item) => (
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
      )}
    </div>
  );
};

export default RecomendedProducts;
