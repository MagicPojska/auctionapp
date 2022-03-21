import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentPageNav from "../components/CurrentPageNav";
import ImageSelection from "../components/ImageSelection";
import Notification from "../components/Notification";
import ProductDetails from "../components/ProductDetails";
import { calculateTimeLeft } from "../utilities/helperFunctions";
import { getProductById } from "../utilities/productsApi";

const ProductOverviewPage = () => {
  const [product, setProduct] = useState("");
  const [images, setImages] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
  const [notification, setNotification] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getProductInfo();
  }, []);

  const getProductInfo = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data);
      setImages(response.data.images.split(","));
      setTimeLeft(calculateTimeLeft(response));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CurrentPageNav title={product.productName} />
      {notification && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      <div className="mx-40 mt-8 2xl:mx-72 flex">
        <ImageSelection images={images} />

        <ProductDetails
          product={product}
          timeLeft={timeLeft}
          getProductInfo={getProductInfo}
          setNotification={setNotification}
        />
      </div>
    </>
  );
};

export default ProductOverviewPage;
