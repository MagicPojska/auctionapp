import { useEffect, useState } from "react";
import Select from "react-select";
import { countryList } from "../../utilities/countryList";
import { customStyles } from "../../utilities/selectStyle";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useUserContext } from "../../contexts/UserContextProvider";
import {
  generateCardExpiryYears,
  generateDays,
  generateMonths,
  generateYears,
} from "../../utilities/helperFunctions";
import moment from "moment";
import { uploadImage } from "../../utilities/imageApi";
import { DATETIME_FORMAT } from "../../utilities/constants";
import { updateUser } from "../../utilities/userApi";
import {
  getUserFromSession,
  getUserFromStorage,
  updateUserInSession,
  updateUserInStorage,
} from "../../utilities/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../LoadingSpinner";
import { getUserCard } from "../../utilities/cardApi";
import ShowChevron from "../ShowChevron";

const ProfileTab = () => {
  const { user } = useUserContext();
  const [isShippingTabOpened, setIsShippingTabOpened] = useState(false);
  const [isCardTabOpened, setIsCardTabOpened] = useState(false);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [files, setFiles] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [userDetails, setUserDetails] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    dateOfBirth: !!user.dateOfBirth
      ? moment(user.dateOfBirth).format("YYYY-MM-DD")
      : "",
    address: !!user.address ? user.address : "",
    city: !!user.city ? user.city : "",
    zipCode: !!user.zipCode ? user.zipCode : "",
    country: !!user.country ? user.country : "",
    state: !!user.state ? user.state : "",
    phone: !!user.phone ? user.phone : "",
    profileImage: !!user.profileImage ? user.profileImage : "",
  });

  const [cardDetails, setCardDetails] = useState({
    cardHolderName: "",
    cardNumber: "",
    expirationYear: "",
    expirationMonth: "",
    cvc: "",
  });

  const [birthDate, setBirthDate] = useState({
    day: !!user.dateOfBirth ? moment(user.dateOfBirth).format("DD") : "",
    month: !!user.dateOfBirth ? moment(user.dateOfBirth).format("MM") : "",
    year: !!user.dateOfBirth ? moment(user.dateOfBirth).format("YYYY") : "",
  });

  useEffect(() => {
    setDaysInMonth(generateDays(birthDate.year, birthDate.month));
  }, [birthDate.year, birthDate.month]);

  useEffect(() => {
    (async () => {
      const { data } = await getUserCard(user.id);
      setCardDetails({
        cardHolderName: !!data.cardHolderName ? data.cardHolderName : "",
        cardNumber: !!data.cardNumber ? data.cardNumber : "",
      });
    })();
  }, []);

  const toggleShippingTabOpened = () => {
    setIsShippingTabOpened(!isShippingTabOpened);
  };

  const toggleCardTabOpened = () => {
    setIsCardTabOpened(!isCardTabOpened);
  };

  const handleShippingDataInput = (input) => (e) => {
    const { value } = e.target;

    setUserDetails((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFiles(event.target.files[0]);
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        setImage({
          ...image,
          imagePreview: reader.result,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveUserInfo = async () => {
    try {
      setIsLoading(true);
      const userInfo = userDetails;

      if (files) {
        const imageData = new FormData();
        imageData.append("file", files);
        imageData.append(
          "upload_preset",
          process.env.REACT_APP_CLOUDINARY_PRESET_NAME
        );

        const imageResponse = await uploadImage(imageData);

        userInfo.profileImage = imageResponse.data.url;
      }

      if (birthDate.day && birthDate.month && birthDate.year) {
        userInfo.dateOfBirth = moment(
          `${birthDate.year}-${birthDate.month}-${birthDate.day}`
        ).format(DATETIME_FORMAT);
      }

      if (
        cardDetails.cardHolderName &&
        cardDetails.cardNumber &&
        cardDetails.expirationYear &&
        cardDetails.expirationMonth &&
        cardDetails.cvc
      ) {
        if (
          cardDetails.expirationYear === moment().year() &&
          cardDetails.expirationMonth <= moment().month() + 1
        ) {
          toast.error("Please enter an unexpired card", {
            position: toast.POSITION.TOP_CENTER,
          });
          return;
        }

        userInfo.card = cardDetails;
      }

      const responseData = await updateUser(userInfo);

      if (getUserFromStorage() !== null) {
        updateUserInStorage(responseData.data);
      } else if (getUserFromSession() !== null) {
        updateUserInSession(responseData.data);
      }

      toast.success("Your info has been saved", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16">
      <div className="w-full border-2">
        <h2 className="px-8 py-4 text-lg font-normal leading-7 bg-bgWhite">
          Personal Information
        </h2>

        <div className="pt-5 pl-5 2xl:pl-20 pr-24 2xl:pr-36 flex">
          <div className="flex flex-col items-center space-y-6 mr-28 min-w-fit">
            <img
              className="h-80 w-80 rounded-full mb-5 object-cover"
              src={`${
                image !== null
                  ? image.imagePreview
                  : userDetails.profileImage
                  ? userDetails.profileImage
                  : "/images/placeholder.png"
              }`}
              alt="profile-photo"
            />
            <label className="w-full text-center py-3 border-4 border-purple">
              <input type="file" onChange={onImageChange} />
              Change photo
            </label>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-lg leading-7 font-normal">First Name</label>
            <div className="border-2 h-16 mb-8 mt-4">
              <input
                type="text"
                className="w-full h-full outline-none px-6 bg-bgWhite"
                placeholder="John"
                onChange={handleShippingDataInput("firstName")}
                value={userDetails.firstName}
              />
            </div>

            <label className="text-lg leading-7 font-normal">Last Name</label>
            <div className="border-2 h-16 mb-8 mt-4">
              <input
                type="text"
                className="w-full h-full outline-none px-6 bg-bgWhite"
                placeholder="Doe"
                onChange={handleShippingDataInput("lastName")}
                value={userDetails.lastName}
              />
            </div>

            <label className="text-lg leading-7 font-normal">
              Email Adress
            </label>
            <div className="border-2 h-16 mb-8 mt-4">
              <input
                type="email"
                disabled={true}
                className="w-full h-full outline-none px-6 bg-textSecondary"
                placeholder="user@domain.com"
                value={userDetails.email}
              />
            </div>

            <label className="text-lg leading-7 font-normal">
              Date of Birth
            </label>
            <div className="flex space-x-6 mb-8 mt-4">
              <Select
                defaultValue={generateYears().find(
                  (year) => year.value === parseInt(birthDate.year)
                )}
                options={generateYears()}
                className="flex-1"
                placeholder="YYYY"
                styles={customStyles}
                isSearchable={false}
                components={{
                  IndicatorSeparator: () => null,
                }}
                onChange={(selectedOption) => {
                  setBirthDate({ ...birthDate, year: selectedOption.value });
                }}
              />

              <Select
                defaultValue={generateMonths().find(
                  (month) => month.value === parseInt(birthDate.month)
                )}
                options={generateMonths()}
                className="flex-1"
                placeholder="MM"
                styles={customStyles}
                isSearchable={false}
                components={{
                  IndicatorSeparator: () => null,
                }}
                onChange={(selectedOption) => {
                  setBirthDate({ ...birthDate, month: selectedOption.value });
                }}
              />

              <Select
                defaultValue={generateDays(
                  birthDate.year,
                  birthDate.month
                ).find((day) => day.value === parseInt(birthDate.day))}
                options={daysInMonth}
                className="flex-1"
                placeholder="DD"
                styles={customStyles}
                isSearchable={false}
                components={{
                  IndicatorSeparator: () => null,
                }}
                onChange={(selectedOption) => {
                  setBirthDate({ ...birthDate, day: selectedOption.value });
                }}
              />
            </div>

            <label className="text-lg leading-7 font-normal">
              Phone Number
            </label>
            <div className="border-2 h-16 mb-8 mt-4">
              <input
                type="text"
                className="w-full h-full outline-none px-6 bg-bgWhite"
                placeholder="+32534231564"
                onChange={handleShippingDataInput("phone")}
                value={userDetails.phone}
              />
            </div>
          </div>
        </div>
      </div>

      {/*Card details form */}
      <div className="w-full border-2 mt-6 font-normal">
        <h2
          className="px-8 py-4 text-lg font-normal leading-7 bg-bgWhite cursor-pointer flex items-center"
          onClick={toggleCardTabOpened}
        >
          <ShowChevron isChevronOpened={isCardTabOpened} /> Card Information
          (Optional)
        </h2>

        <div
          className={`${
            !isCardTabOpened && "hidden"
          } pt-5 pl-5 2xl:pl-20 pr-24 2xl:pr-36 flex`}
        >
          <div className="mr-28 min-w-fit w-80">
            <div className="w-80"></div>
          </div>

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
        </div>
      </div>

      {/*Shipping address form */}
      <div className="w-full border-2 mt-6 font-normal">
        <h2
          className="px-8 py-4 text-lg font-normal leading-7 bg-bgWhite cursor-pointer flex items-center"
          onClick={toggleShippingTabOpened}
        >
          <ShowChevron isChevronOpened={isShippingTabOpened} /> Shipping Address
          (Optional)
        </h2>

        <div
          className={`${
            !isShippingTabOpened && "hidden"
          } pt-5 pl-5 2xl:pl-20 pr-24 2xl:pr-36 flex`}
        >
          <div className="mr-28 min-w-fit w-80">
            <div className="w-80"></div>
          </div>

          <div className="flex flex-col w-full">
            <label className="text-lg leading-7">Street</label>
            <div className="border-2 h-16 mb-8 mt-4">
              <input
                type="text"
                className="w-full h-full outline-none px-6 bg-bgWhite"
                placeholder="123 Main Street"
                onChange={handleShippingDataInput("address")}
                value={userDetails.address}
              />
            </div>

            <div className="flex space-x-6 mb-8">
              <div className=" flex-1  flex flex-col">
                <label className="text-lg leading-7">City</label>
                <input
                  type="text"
                  placeholder="eg. Madrid"
                  className="w-full border-2 h-16 p-6 mt-4 bg-bgWhite outline-none"
                  onChange={handleShippingDataInput("city")}
                  value={userDetails.city}
                />
              </div>

              <div className=" flex-1  flex flex-col">
                <label className="text-lg leading-7">Zip Code</label>
                <input
                  type="text"
                  placeholder="XXXXXX"
                  className="w-full border-2 h-16 p-6 mt-4 bg-bgWhite outline-none"
                  onChange={handleShippingDataInput("zipCode")}
                  value={userDetails.zipCode}
                />
              </div>
            </div>

            <label className="text-lg leading-7">State</label>
            <div className="border-2 h-16 mb-8 mt-4">
              <input
                type="text"
                className="w-full h-full outline-none px-6 bg-bgWhite"
                placeholder="eg. Asturias"
                onChange={handleShippingDataInput("state")}
                value={userDetails.state}
              />
            </div>

            <label className="text-lg leading-7">Country</label>
            <Select
              defaultValue={countryList.find(
                (country) => country.value === userDetails.country
              )}
              options={countryList}
              className="mb-16 mt-4"
              placeholder="eg. Spain"
              styles={customStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
              onChange={(selectedOption) => {
                setUserDetails({
                  ...userDetails,
                  country: selectedOption.value,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <button
            className="text-center font-bold border-4 border-purple py-2 px-8 mt-6"
            onClick={handleSaveUserInfo}
          >
            SAVE INFO
          </button>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProfileTab;
