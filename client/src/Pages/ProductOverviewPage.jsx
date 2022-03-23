import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CurrentPageNav from "../components/CurrentPageNav";
import ImageSelection from "../components/ImageSelection";
import Notification from "../components/Notification";
import { useUserContext } from "../contexts/UserContextProvider";
import { postBid } from "../utilities/bidApi";
import { calculateTimeLeft } from "../utilities/helperFunctions";
import { getProductById } from "../utilities/productsApi";
import { BsChevronRight } from "react-icons/bs";

const ProductOverviewPage = () => {
  const [product, setProduct] = useState("");
  const [images, setImages] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");
  const [notification, setNotification] = useState("");
  const [bid, setBid] = useState("");
  const { id } = useParams();
  const { user } = useUserContext();

  const SUCCESS = "success";
  const FAIL = "fail";

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

  const placeBid = async (e) => {
    e.preventDefault();
    if (bid <= product.startPrice || bid <= product.highestBid) {
      setNotification({
        ...notification,
        type: FAIL,
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
      await getProductInfo();
      setNotification({
        ...notification,
        type: SUCCESS,
        message: "Congrats! You are the highest bider!",
      });
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

        <div className="w-1/2">
          <h1 className="text-3xl font-normal mb-4">{product.productName}</h1>
          <p className="text-base font-light mb-4 text-purple">
            Starts from <span className="font-bold">${product.startPrice}</span>
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
                {timeLeft.minutes < 0
                  ? "Expired"
                  : timeLeft.weeks > 0
                  ? `${timeLeft.weeks} ${
                      timeLeft.weeks === 1 ? "Week" : "Weeks"
                    } ${Math.floor(timeLeft.days % 7)} ${
                      timeLeft.days === 1 ? "Day" : "Days"
                    }`
                  : timeLeft.days > 0
                  ? `${timeLeft.days} ${timeLeft.days === 1 ? "Day" : "Days"} ${
                      timeLeft.days
                    } ${timeLeft.hours === 1 ? "Hour" : "Hours"}`
                  : `${timeLeft.hours} ${
                      timeLeft.hours === 1 ? "Hour" : "Hours"
                    } ${timeLeft.minutes} ${
                      timeLeft.minutes === 1 ? "Minute" : "Minutes"
                    }`}
              </span>
            </p>
          </div>

          {timeLeft.minutes < 0 ? (
            <></>
          ) : (
            <div className="flex">
              <input
                type="text"
                value={bid}
                onChange={(e) => {
                  if (e.target.value.match("^[0-9.]*$") != null) {
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
  );
};

export default ProductOverviewPage;
