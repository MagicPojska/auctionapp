import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentPageNav from "../components/CurrentPageNav";
import ProductDetails from "../components/ProductDetails";
import { getProductById } from "../utilities/productsApi";

const ProductOverviewPage = () => {
  const [product, setProduct] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await getProductById(id);
      setProduct(response.data);
      calculateTimeLeft(response);
    })();
  }, []);

  const calculateTimeLeft = (response) => {
    const startDate = new Date();
    const endDate = new Date(response.data.endDate);
    const diffDays = Math.ceil(
      Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)
    );
    const diffWeeks = Math.floor(diffDays / 7);
    const diff = {
      weeks: diffWeeks,
      days: Math.floor(diffDays % 7),
    };
    setTimeLeft(diff);
  };

  return (
    <>
      <CurrentPageNav title={product.productName} />
      <div className="mx-40 2xl:mx-72 flex">
        <div className="w-1/2">
          <div className="mr-28 flex justify-center p-4">
            <img
              src={product.images}
              className="object-cover aspect-[7/9]"
              alt=""
            />
          </div>
        </div>

        <ProductDetails product={product} timeLeft={timeLeft} />
      </div>
    </>
  );
};

export default ProductOverviewPage;
