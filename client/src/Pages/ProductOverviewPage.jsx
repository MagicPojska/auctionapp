import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useParams } from "react-router-dom";
import CurrentPageNav from "../components/CurrentPageNav";
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

        <div className="w-1/2">
          <h1 className="text-3xl font-normal mb-4">{product.productName}</h1>
          <p className="text-base font-light mb-4 text-purple">
            Starts from <span className="font-bold">${product.startPrice}</span>
          </p>
          <div className="text-base font-light py-6 px-9 border-2 space-y-4 mb-16 w-fit">
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
              <span className="font-bold text-purple">
                {timeLeft.weeks} Weeks {timeLeft.days} Days
              </span>
            </p>
          </div>

          <div className="flex">
            <input
              type="text"
              className="border-2 py-3 px-8 mr-6 w-4/6 focus:outline-none"
              placeholder="Enter $56 or higher"
            />
            <button className="mt-auto flex border-4 border-purple w-48 h-14 justify-center items-center leading-7 text-base font-bold">
              PLACE BID &nbsp;&nbsp;{" "}
              <BsChevronRight className="stroke-2 text-xs" />
            </button>
          </div>

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
