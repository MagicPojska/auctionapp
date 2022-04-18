import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBidsForProduct } from "../../utilities/bidApi";
import { getDayMonthYear } from "../../utilities/helperFunctions";

const BidsTable = () => {
  const { id } = useParams();
  const [bids, setBids] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    getBids(id, 0);
  }, []);

  const getBids = async (id, page) => {
    try {
      const response = await getBidsForProduct(id, page);
      console.log(response);
      if (page === 0) {
        setBids(response.data.content);
      } else {
        setBids([...bids, ...response.data.content]);
      }

      setHasMore(!response.data.last);
      setPageNumber(page);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreBids = () => {
    getBids(id, pageNumber + 1);
  };

  return (
    <div className="mt-32">
      <h2 className="text-center font-bold text-2xl leading-7 mb-4">
        {bids.length > 0 ? "Bidders" : "No bids"}
      </h2>
      <hr className="bg-black mb-36" />

      {bids.length > 0 && (
        <div className="relative border-2">
          <table className="w-full text-base text-left">
            <thead className="bg-bgWhite whitespace-nowrap">
              <tr>
                <th className="pl-8 pr-4 py-3 font-normal">Bidder</th>
                <th className="font-normal">Date</th>
                <th className="px-6 py-3 font-normal">Bid</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr key={bid.id} className="bg-white">
                  <th className="pl-8 pr-4 py-4 w-4/6">
                    <div className="flex items-center space-x-6">
                      <img
                        src={`${
                          bid.user.profileImage
                            ? bid.user.profileImage
                            : "/images/placeholder.png"
                        }`}
                        alt="bidder"
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <p>
                        {bid.user.firstName} {bid.user.lastName}
                      </p>
                    </div>
                  </th>
                  <th className="pr-24">
                    <span>
                      {(() => {
                        const date = getDayMonthYear(bid.date);
                        return `${date.day} ${date.month} ${date.year}`;
                      })()}
                    </span>
                  </th>
                  <th
                    className={`px-6 py-4 ${
                      index === 0 ? "text-blue-600" : "text-textTetriary"
                    }`}
                  >
                    {bid.price}$
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="w-full flex justify-end mt-8">
        <button
          className={`py-4 px-14 bg-purple text-white text-base font-bold leading-7 ${
            hasMore ? "" : "hidden"
          }`}
          onClick={loadMoreBids}
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default BidsTable;
