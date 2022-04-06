import moment from "moment";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContextProvider";
import { ACTIVE, SOLD } from "../../utilities/constants";
import { getHoursDiff } from "../../utilities/helperFunctions";
import { shopProductPath } from "../../utilities/paths";
import { getProductsFromUser } from "../../utilities/productsApi";

const SellerTab = () => {
  const { user } = useUserContext();
  const [tab, setTab] = useState(ACTIVE);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getProductsFromUser(user.id, tab);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [tab]);

  return (
    <div className="mt-16">
      <div className="w-full flex">
        <button
          className={`px-6 py-2 border-2 ${
            tab === ACTIVE && "bg-purple text-white border-none"
          }`}
          onClick={() => setTab(ACTIVE)}
        >
          Active
        </button>
        <button
          className={`px-6 py-2 border-y-2 border-r-2 ${
            tab === SOLD && "bg-purple text-white border-none"
          }`}
          onClick={() => setTab(SOLD)}
        >
          Sold
        </button>
      </div>

      <div className="relative border-2">
        <table className="w-full text-base text-left">
          <thead className="bg-bgWhite whitespace-nowrap">
            <tr>
              <th className="pl-8 pr-4 py-3 font-normal">Item</th>
              <th className="font-normal">Name</th>
              <th className="px-6 py-3 font-normal">Time left</th>
              <th className="px-6 py-3 font-normal">Your price</th>
              <th className="px-6 py-3 font-normal">No. bids</th>
              <th className="px-6 py-3 font-normal">Highest bid</th>
              <th className="px-6 py-3 font-normal">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="bg-white">
                <th className="pl-8 pr-4 py-4">
                  <img
                    src={product.images.split(",")[0]}
                    alt="item"
                    className="w-20 h-20 object-cover"
                  />
                </th>
                <th className="pr-24">
                  <div className="flex flex-col">
                    <span>{product.productName}</span>
                    <span className="text-sm font-normal text-purple">
                      #{product.id}
                    </span>
                  </div>
                </th>
                <td className="px-6 py-4">{getHoursDiff(product.endDate)}h</td>
                <td className="px-6 py-4">$ {product.startPrice}</td>
                <td className="px-6 py-4">{product.numberOfBids}</td>
                <td className="px-6 py-4 text-blue-600">
                  {product.highestBid !== null
                    ? "$ " + product.highestBid
                    : "No bids"}
                </td>
                <td className="pl-6 pr-8 py-4 text-right">
                  <Link
                    to={shopProductPath + "/" + product.id}
                    className="font-bold px-8 py-3 border-4"
                  >
                    VIEW
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerTab;
