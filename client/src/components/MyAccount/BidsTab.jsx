import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContextProvider";
import { getBidsForUser } from "../../utilities/bidApi";
import { getHoursDiff } from "../../utilities/helperFunctions";
import { categoriesPath, shopProductPath } from "../../utilities/paths";
import { RiAuctionFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import moment from "moment";

const BidsTab = () => {
  const { user } = useUserContext();
  const [bids, setBids] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getBidsForUser(user.id);
        setBids(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="mt-16">
      <div className="relative border-2">
        <table className="w-full text-base text-left">
          <thead className="bg-bgWhite whitespace-nowrap">
            <tr>
              <th className="pl-8 pr-4 py-3 font-normal">Item</th>
              <th className="font-normal">Name</th>
              <th className="px-6 py-3 font-normal">Time left</th>
              <th className="px-6 py-3 font-normal">Your bid</th>
              <th className="px-6 py-3 font-normal">No. bids</th>
              <th className="px-6 py-3 font-normal">Highest bid</th>
              <th className="px-6 py-3 font-normal">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {bids.length > 0 ? (
              bids.map((bid) => (
                <tr key={bid.id} className="bg-white">
                  <th className="pl-8 pr-4 py-4">
                    <img
                      src={bid.product.images.split(",")[0]}
                      alt="item"
                      className="w-20 h-20 object-cover"
                    />
                  </th>
                  <th className="pr-24">
                    <div className="flex flex-col">
                      <span>{bid.product.productName}</span>
                      <span className="text-sm font-normal text-purple">
                        #{bid.product.id}
                      </span>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    {getHoursDiff(bid.product.endDate)}h
                  </td>
                  <td className="px-6 py-4">$ {bid.price}</td>
                  <td className="px-6 py-4">{bid.product.numberOfBids}</td>
                  <td
                    className={`px-6 py-4 ${
                      bid.product.highestBid === bid.price
                        ? "text-green"
                        : "text-blue-600"
                    }`}
                  >
                    {bid.price !== null
                      ? "$ " + bid.product.highestBid
                      : "No bids"}
                  </td>
                  <td className="pl-6 pr-8 py-4 text-right">
                    <Link
                      to={shopProductPath + "/" + bid.product.id}
                      className="font-bold px-8 py-3 border-4"
                    >
                      {moment(bid.product.endDate).isBefore(new Date()) &&
                      bid.product.highestBid === bid.price
                        ? bid.product.sold
                          ? "BOUGHT"
                          : "PAY"
                        : "VIEW"}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className="flex flex-col justify-center items-center py-9">
                    <RiAuctionFill className="text-8xl text-purple" />
                    <p className="font-normal my-9">
                      You don’t have any bids and there are so many cool
                      products available for sale.
                    </p>
                    <Link
                      to={categoriesPath + "/1"}
                      className="py-4 px-16 border-4 border-purple font-bold"
                    >
                      START BIDDING
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BidsTab;
