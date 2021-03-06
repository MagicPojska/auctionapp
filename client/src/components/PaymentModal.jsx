import { useState } from "react";
import Select from "react-select";
import { useUserContext } from "../contexts/UserContextProvider";
import {
  generateCardExpiryYears,
  generateMonths,
} from "../utilities/helperFunctions";
import { customStyles } from "../utilities/selectStyle";
import { GrFormClose } from "react-icons/gr";
import { buyProduct } from "../utilities/productsApi";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getUserFromSession,
  getUserFromStorage,
  setCardInSession,
  setCardInStorage,
} from "../utilities/auth";
import { NOTIFICATION_SUCCESS } from "../utilities/constants";

const PaymentModal = ({
  setShowModal,
  product,
  setProduct,
  setNotification,
  notification,
}) => {
  const { user, card } = useUserContext();
  const [cardDetails, setCardDetails] = useState({
    cardHolderName: !!card?.cardHolderName ? card.cardHolderName : "",
    cardNumber: !!card?.cardNumber ? card.cardNumber : "",
    expirationYear: "",
    expirationMonth: "",
    cvc: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const payForProduct = async (e) => {
    try {
      setIsLoading(true);

      if (
        cardDetails.cardHolderName &&
        cardDetails.cardNumber &&
        cardDetails.expirationYear &&
        cardDetails.expirationMonth &&
        cardDetails.cvc
      ) {
        const paymentDetails = {
          productId: product.id,
          userId: user.id,
          card: cardDetails,
        };
        const response = await buyProduct(paymentDetails);
        setProduct(response.data);

        if (getUserFromStorage() !== null) {
          setCardInStorage({
            cardHolderName: cardDetails.cardHolderName,
            cardNumber: cardDetails.cardNumber,
            userId: user.id,
          });
        } else if (getUserFromSession() !== null) {
          setCardInSession({
            cardHolderName: cardDetails.cardHolderName,
            cardNumber: cardDetails.cardNumber,
            userId: user.id,
          });
        }

        toast.success("Payment successfull", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setNotification({
          ...notification,
          type: NOTIFICATION_SUCCESS,
          message: "Congrats! You are the winner!",
        });
        setShowModal(false);
      } else {
        toast.error("Please fill in all the fields");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      toast.error("Payment failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <div className="w-full flex flex-col items-center space-y-2">
                <img
                  src={product.images.split(",")[0]}
                  alt="highlighed image"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <h3 className="text-2xl font-semibold">
                  {product.productName}
                </h3>
                <p className="text-textTetriary font-normal">
                  Your total is ${product.highestBid}
                </p>
              </div>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black   absolute top-4 right-4 text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <GrFormClose />
              </button>
            </div>

            <div className="relative p-6 flex-auto font-normal">
              <div className="flex flex-col w-full">
                <label className="text-lg leading-7">Name on Card</label>
                <div className="border-2 h-16 mb-8 mt-4">
                  <input
                    type="text"
                    className="w-full h-full outline-none px-6 bg-bgWhite"
                    placeholder="John Doe"
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cardHolderName: e.target.value,
                      })
                    }
                    value={cardDetails.cardHolderName}
                  />
                </div>

                <label className="text-lg leading-7">Card Number</label>
                <div className="border-2 h-16 mb-8 mt-4">
                  <input
                    type="text"
                    maxLength={16}
                    className="w-full h-full outline-none px-6 bg-bgWhite"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    onChange={(e) => {
                      if (e.target.value.match("^[0-9]*$") != null) {
                        setCardDetails({
                          ...cardDetails,
                          cardNumber: e.target.value,
                        });
                      }
                    }}
                    value={cardDetails.cardNumber}
                  />
                </div>

                <div className="flex space-x-6 mb-4">
                  <div className="flex flex-col flex-1">
                    <label className="text-lg leading-7 font-normal mb-4">
                      Expiration Date
                    </label>
                    <Select
                      options={generateCardExpiryYears()}
                      placeholder="YYYY"
                      styles={customStyles}
                      isSearchable={false}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      onChange={(selectedOption) => {
                        setCardDetails({
                          ...cardDetails,
                          expirationYear: selectedOption.value,
                        });
                      }}
                    />
                  </div>

                  <div className="flex flex-col flex-1 justify-end">
                    <Select
                      options={generateMonths()}
                      placeholder="MM"
                      styles={customStyles}
                      isSearchable={false}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      onChange={(selectedOption) => {
                        setCardDetails({
                          ...cardDetails,
                          expirationMonth: selectedOption.value,
                        });
                      }}
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <label className="text-lg leading-7 font-normal  mb-4">
                      CVC/CVV
                    </label>
                    <div className="border-2 h-12">
                      <input
                        type="password"
                        maxLength={4}
                        className="w-full h-full outline-none px-6 bg-bgWhite"
                        placeholder="***"
                        onChange={(e) => {
                          if (e.target.value.match("^[0-9]*$") != null) {
                            setCardDetails({
                              ...cardDetails,
                              cvc: e.target.value,
                            });
                          }
                        }}
                        value={cardDetails.cvc}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <button
                  className="bg-purple text-white active:bg-purple font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={payForProduct}
                >
                  Pay ${product.highestBid}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default PaymentModal;
