import { BiChevronRight } from "react-icons/bi";
import StripeCheckout from "react-stripe-checkout";
import { buyProduct } from "../../utilities/productsApi";

const BuyButton = ({ price, productId, user, images }) => {
  const stripePrice = price * 100;

  const onToken = async (token) => {
    try {
      token.productId = productId;
      token.userId = user.id;
      console.log(token);
      const response = await buyProduct(token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex justify-end">
      <StripeCheckout
        amount={stripePrice}
        name="Auction App"
        description={`Your total is $${price}`}
        pannelLabel="Pay Now"
        image={images[0]}
        token={onToken}
        email={user.email}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        currency="USD"
      >
        <button className="flex space-x-4 border-4 border-purple px-8 h-14 justify-center items-center leading-7 text-base font-bold">
          <p>PAY</p>
          <BiChevronRight className="text-2xl" />
        </button>
      </StripeCheckout>
    </div>
  );
};

export default BuyButton;
