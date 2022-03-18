import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentPageNav from "../components/CurrentPageNav";
import ImageSelection from "../components/ImageSelection";
import Notification from "../components/Notification";
import ProductDetails from "../components/ProductDetails";
import { getProductById } from "../utilities/productsApi";
import moment from "moment";

const ProductOverviewPage = () => {
  const [product, setProduct] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");
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
      setImage(response.data.images.split(",")[0]);
      calculateTimeLeft(response);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTimeLeft = (response) => {
    const startDate = moment();
    const endDate = new Date(response.data.endDate);

    const date = endDate - startDate;

    const diff = {
      weeks: moment.duration(date).weeks(),
      days: moment.duration(date).days(),
      hours: moment.duration(date).hours(),
      minutes: moment.duration(date).minutes(),
    };
    setTimeLeft(diff);
  };

  return (
    <>
      <CurrentPageNav title={product.productName} />
      {notification && <Notification notification={notification} />}

      <div className="mx-40 mt-8 2xl:mx-72 flex">
        <ImageSelection images={images} image={image} setImage={setImage} />

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
