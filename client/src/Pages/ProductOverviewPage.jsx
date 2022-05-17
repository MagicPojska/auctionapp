import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentPageNav from "../components/CurrentPageNav";
import ImageSelection from "../components/ImageSelection";
import Notification from "../components/Notification";
import { useUserContext } from "../contexts/UserContextProvider";
import { postBid } from "../utilities/bidApi";
import { calculateTimeLeft, parseTimeLeft } from "../utilities/helperFunctions";
import { getProductById } from "../utilities/productsApi";
import {
  NOTIFICATION_FAIL,
  NOTIFICATION_SUCCESS,
} from "../utilities/constants";
import { BsChevronRight } from "react-icons/bs";
import LoadingSpinner from "../components/LoadingSpinner";
import BidsTable from "../components/ProductOverviewPage/BidsTable";
import RecomendedProducts from "../components/ProductOverviewPage/RecomendedProducts";
import { BiChevronRight } from "react-icons/bi";
import PaymentModal from "../components/PaymentModal";
import { ToastContainer } from "react-toastify";
import { getTokenFromSession, getTokenFromStorage } from "../utilities/auth";
import { EventSourcePolyfill } from "event-source-polyfill";

const ProductOverviewPage = () => {
  const [product, setProduct] = useState("");
  const [images, setImages] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [bid, setBid] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { user } = useUserContext();

  useEffect(() => {
    getProductInfo();
  }, []);

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      `${process.env.REACT_APP_API_URL}/notifications/subscribe/product`
    );

    eventSource.addEventListener(
      product.id + " " + product.productName,
      handleServerEvent,
      false
    );

    return () => {
      eventSource.close();
    };
  }, [product]);

  const handleServerEvent = (e) => {
    setProduct(JSON.parse(e.data));
  };

  const getProductInfo = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data);
      setImages(response.data.images.split(","));
      setTimeLeft(calculateTimeLeft(response));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const placeBid = async (e) => {
    e.preventDefault();
    if (bid <= product.startPrice || bid <= product.highestBid) {
      setNotification({
        ...notification,
        type: NOTIFICATION_FAIL,
        message:
          "There are higher bids than yours. You could give a second try!",
      });
      return;
    }

    try {
      const bidDetails = {
        price: bid,
        userId: user.id,
        productId: product.id,
      };
      await postBid(bidDetails);

      setNotification({
        ...notification,
        type: NOTIFICATION_SUCCESS,
        message: "Congrats! You are the highest bider!",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <div className="flex justify-center my-44 text-2xl font-bold">
          <LoadingSpinner />
        </div>
      ) : product ? (
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

            <div className="w-1/2">
              <h1 className="text-3xl font-normal mb-4">
                {product.productName}
              </h1>
              <p className="text-base font-light mb-4 text-purple">
                Starts from{" "}
                <span className="font-bold">${product.startPrice}</span>
              </p>
              <div className="text-base font-light py-6 px-9 border-2 space-y-4 mb-16 w-fit">
                <p>
                  Highest bid:{" "}
                  <span className="font-bold text-purple">
                    {product.highestBid !== null
                      ? "$" + product.highestBid
                      : "No bids"}
                  </span>
                </p>
                <p>
                  Number of bids:{" "}
                  <span className="font-bold text-purple">
                    {product.numberOfBids}
                  </span>
                </p>
                <p>
                  Time left:{" "}
                  <span className="font-bold text-purple">
                    {parseTimeLeft(timeLeft)}
                  </span>
                </p>
              </div>

              {timeLeft.minutes < 0 ? (
                user &&
                user.id === product.highestBidder && (
                  <div className="w-full flex justify-end">
                    <button
                      className={`flex space-x-4 border-4 border-purple px-8 h-14 justify-center items-center leading-7 text-base font-bold ${
                        product.sold && "opacity-30"
                      }`}
                      onClick={() => setShowModal(true)}
                      disabled={product.sold}
                    >
                      <p>{product.sold ? "BOUGHT" : "PAY"}</p>
                      <BiChevronRight className="text-2xl" />
                    </button>
                  </div>
                )
              ) : (
                <div className="flex">
                  <input
                    type="text"
                    value={bid}
                    onChange={(e) => {
                      if (
                        e.target.value.match("^[0-9.]*$") != null &&
                        e.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/)
                      ) {
                        setBid(e.target.value);
                      }
                    }}
                    className="appearance-none border-2 py-3 px-8 mr-6 w-4/6 focus:outline-none"
                    placeholder={`Enter $${
                      product.highestBid !== null
                        ? product.highestBid
                        : product.startPrice
                    } or higher`}
                    disabled={(!user || user.id === product.userId) && true}
                  />
                  <button
                    onClick={placeBid}
                    className={`mt-auto flex border-4 border-purple w-48 h-14 justify-center items-center leading-7 text-base font-bold ${
                      (!user || user.id === product.userId) && "opacity-25"
                    }`}
                    disabled={(!user || user.id === product.userId) && true}
                  >
                    PLACE BID &nbsp;&nbsp;{" "}
                    <BsChevronRight className="stroke-2 text-xs" />
                  </button>
                </div>
              )}

              <div>
                <div className="border-b-2 mt-16">
                  <div className="space-x-12 text-xl leading-6 font-normal text-purple">
                    <button
                      className="pb-4  
                 border-b-[3px] border-purple px-6"
                    >
                      Details
                    </button>
                  </div>
                </div>

                <div className="mt-8 text-base leading-6 font-normal text-textTetriary">
                  <span>Note:</span>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center my-44 text-2xl font-bold">
          Product with id:{id} not found
        </div>
      )}
      <div className="mx-40 2xl:mx-72">
        {user && user.id === product.userId ? (
          <BidsTable />
        ) : (
          <RecomendedProducts />
        )}
      </div>

      {showModal && (
        <PaymentModal
          setShowModal={setShowModal}
          product={product}
          setProduct={setProduct}
        />
      )}
    </>
  );
};

export default ProductOverviewPage;
