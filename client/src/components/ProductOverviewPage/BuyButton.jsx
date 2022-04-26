import { BiChevronRight } from "react-icons/bi";
import StripeCheckout from "react-stripe-checkout";
import { buyProduct } from "../../utilities/productsApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuyButton = ({ product, user, images, setProduct }) => {
  const stripePrice = product.highestBid * 100;

  const onToken = async (token) => {
    try {
      token.productId = product.id;
      token.userId = user.id;
      const response = await buyProduct(token);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
      if (error.response.status !== 200) {
        toast.error("Payment failed!");
      }
    }
  };

  return (
    <div className="w-full flex justify-end">
      <ToastContainer />
      <StripeCheckout
        amount={stripePrice}
        name="Auction App"
        description={`Your total is $${product.highestBid}`}
        pannelLabel="Pay Now"
        image={images[0]}
        token={onToken}
        email={user.email}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        currency="USD"
      >
        <button
          className={`flex space-x-4 border-4 border-purple px-8 h-14 justify-center items-center leading-7 text-base font-bold ${
            product.sold && "opacity-30"
          }`}
          disabled={product.sold && true}
        >
          <p>{product.sold ? "BOUGHT" : "PAY"}</p>
          <BiChevronRight className="text-2xl" />
        </button>
      </StripeCheckout>
    </div>
  );
};

export default BuyButton;
