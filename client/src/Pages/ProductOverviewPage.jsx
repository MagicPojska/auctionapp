import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentPageNav from "../components/CurrentPageNav";
import ImageSelection from "../components/ImageSelection";
import ProductDetails from "../components/ProductDetails";
import { getProductById } from "../utilities/productsApi";
import NotFoundPage from "./NotFoundPage";

const ProductOverviewPage = () => {
  const [product, setProduct] = useState("");
  const [images, setImages] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
        setImages(response.data.images.split(","));
        calculateTimeLeft(response);
      } catch (error) {
        console.error(error);
      }
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
      <div className="mx-40 mt-8 2xl:mx-72 flex">
        <ImageSelection images={images} />

        <ProductDetails product={product} timeLeft={timeLeft} />
      </div>
    </>
  );
};

export default ProductOverviewPage;
