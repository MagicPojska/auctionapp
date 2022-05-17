import { Link } from "react-router-dom";
import { useEffect } from "react";
import { myAccountPath, profilePath } from "../../../utilities/paths";
import Select from "react-select";
import { customStyles } from "../../../utilities/selectStyle";
import { countryList } from "../../../utilities/countryList";
import LoadingSpinner from "../../LoadingSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../../contexts/UserContextProvider";
import {
  generateCardExpiryYears,
  generateMonths,
} from "../../../utilities/helperFunctions";

const StepThree = ({
  prevStep,
  productDetails,
  setProductDetails,
  handleInputData,
  handlePostItem,
  cardDetails,
  setCardDetails,
  isLoading,
}) => {
  const { user } = useUserContext();

  useEffect(() => {
    setProductDetails({
      ...productDetails,
      address: !!user.address ? user.address : "",
      email: user.email,
      phone: !!user.phone ? user.phone : "",
      city: !!user.city ? user.city : "",
      country: !!user.country ? user.country : "",
      zipCode: !!user.zipCode ? user.zipCode : "",
    });
  }, [user]);

  const handleCountryChange = (selectedOption) => {
    setProductDetails({ ...productDetails, country: selectedOption.value });
  };

  return (
    <div className="border-2 pb-16 font-normal">
      <div className="py-6 bg-bgWhite mb-12">
        <h2 className="text-center text-2xl font-bold leading-7">
          LOCATION & SHIPPING
        </h2>
      </div>

      <div className="px-24">
        <label className="text-lg leading-7">Address</label>
        <div className="border-2 h-16 mb-8 mt-4">
          <input
            type="text"
            className="w-full h-full outline-none px-6 bg-bgWhite"
            placeholder="123 Main Street"
            value={productDetails.address}
            onChange={handleInputData("address")}
          />
        </div>

        <label className="text-lg leading-7">Email</label>
        <div className="border-2 h-16 mb-8 mt-4">
          <input
            type="email"
            className="w-full h-full outline-none px-6 bg-bgWhite"
            placeholder="user@domain.com"
            value={productDetails.email}
            onChange={handleInputData("email")}
          />
        </div>

        <div className="flex space-x-6 mb-8">
          <div className=" flex-1  flex flex-col">
            <label className="text-lg leading-7">City</label>
            <input
              type="text"
              placeholder="eg. Madrid"
              className="w-full border-2 h-16 p-6 mt-4 bg-bgWhite outline-none"
              value={productDetails.city}
              onChange={handleInputData("city")}
            />
          </div>

          <div className=" flex-1  flex flex-col">
            <label className="text-lg leading-7">Zip Code</label>
            <input
              type="number"
              placeholder="XXXXXX"
              className="w-full border-2 h-16 p-6 mt-4 bg-bgWhite outline-none"
              value={productDetails.zipCode}
              onChange={handleInputData("zipCode")}
            />
          </div>
        </div>

        <label className="text-lg leading-7">Country</label>
        <Select
          defaultValue={countryList.find(
            (country) => country.value === user.country
          )}
          options={countryList}
          onChange={handleCountryChange}
          className="mb-8 mt-4"
          placeholder="eg. Spain"
          styles={customStyles}
          components={{
            IndicatorSeparator: () => null,
          }}
        />

        <label className="text-lg leading-7">Phone Number</label>
        <div className="border-2 h-16 mb-8 mt-4">
          <input
            type="number"
            className="w-full h-full outline-none px-6 bg-bgWhite"
            placeholder="+32534231564"
            value={productDetails.phone}
            onChange={handleInputData("phone")}
          />
        </div>

        <label className="text-lg leading-7">Payment details</label>
        <hr className="mb-8 mt-4" />

        <div className="flex items-center space-x-4 w-full mb-6">
          <p className="text-textTetriary text-sm flex-1">
            We accept the following credit cards
          </p>
          <div className="flex justify-between flex-1">
            <img
              className="w-10 h-6 object-contain"
              src="/images/visa.png"
              alt="visa"
            />
            <img
              className="w-10 h-6 object-contain"
              src="/images/mastercard.png"
              alt="mastercard"
            />
            <img
              className="w-10 h-6 object-contain"
              src="/images/americanexpress.jpg"
              alt="american express"
            />
            <img
              className="w-10 h-6 object-contain"
              src="/images/maestro.png"
              alt="maestro"
            />
          </div>
        </div>

        <div className="flex flex-col w-full mb-8">
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

          <div className="flex space-x-6 mb-8 mt-4">
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

        <div className="flex space-x-6 text-lg font-bold leading-7 items-center">
          <div className="flex-1">
            <Link
              to={myAccountPath + profilePath}
              className="text-center border-4 py-3 px-8"
            >
              Cancel
            </Link>
          </div>
          {isLoading ? (
            <LoadingSpinner width={"w-12 h-12"} />
          ) : (
            <div className="flex-1 flex space-x-6">
              <button
                className="flex-1 outline outline-4 outline-purple outline-offset-[-4px] py-3 text-black"
                onClick={prevStep}
              >
                Back
              </button>

              <button
                onClick={handlePostItem}
                className="flex-1 bg-purple py-3 text-white"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StepThree;
