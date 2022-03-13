import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentPageNav from "../components/CurrentPageNav";
import { getProductById } from "../utilities/productsApi";

const ProductOverviewPage = () => {
  const [product, setProduct] = useState("");
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await getProductById(id);
      setProduct(response.data);
    })();
  }, []);

  return (
    <>
      <CurrentPageNav title={product.productName} />
      <div className="mx-40 2xl:mx-72 flex">
        <div className="w-1/2">images</div>
        <div>
          <h1 className="w-1/2 text-3xl font-normal mb-4">
            {product.productName}
          </h1>
          <p className="text-base font-light mb-4 text-purple">
            Starts from <span className="font-bold">${product.startPrice}</span>
          </p>
          <div className="text-base font-light py-6 px-9 border-2 space-y-4">
            <p>
              Highest bid:{" "}
              <span className="font-bold text-purple">
                ${product.startPrice}
              </span>
            </p>
            <p>
              Number of bids: <span className="font-bold text-purple">0</span>
            </p>
            <p>
              Time left:{" "}
              <span className="font-bold text-purple">${product.endDate}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOverviewPage;
