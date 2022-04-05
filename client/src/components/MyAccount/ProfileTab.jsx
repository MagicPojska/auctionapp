import { useEffect, useState } from "react";
import Select from "react-select";
import { countryList } from "../../utilities/countryList";
import { customStyles } from "../../utilities/selectStyle";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useUserContext } from "../../contexts/UserContextProvider";
import {
  generateDays,
  generateMonths,
  generateYears,
} from "../../utilities/helperFunctions";
import moment from "moment";

const ProfileTab = () => {
  const { user } = useUserContext();
  const [isOpened, setIsOpened] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    dateOfBirth:
      user.dateOfBirth === null
        ? ""
        : moment(user.dateOfBirth).format("YYYY-MM-DD"),
    address: user.address === null ? "" : user.address,
    city: user.city === null ? "" : user.city,
    zipCode: user.zipCode === null ? "" : user.zipCode,
    country: user.country === null ? "" : user.country,
    state: user.state === null ? "" : user.state,
    phone: user.phone === null ? "" : user.phone,
    profileImage: user.profileImage === null ? "" : user.profileImage,
  });
  const [birthDate, setBirthDate] = useState({
    day: user.dateOfBirth === null ? "" : moment(user.dateOfBirth).format("DD"),
    month:
      user.dateOfBirth === null ? "" : moment(user.dateOfBirth).format("MM"),
    year:
      user.dateOfBirth === null ? "" : moment(user.dateOfBirth).format("YYYY"),
  });
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [files, setFiles] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setDaysInMonth(generateDays(birthDate.year, birthDate.month));
  }, [birthDate.year, birthDate.month]);

  const handleOpening = () => {
    setIsOpened(!isOpened);
  };

  const handleInputData = (input) => (e) => {
    const { value } = e.target;

    setUserDetails((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
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
                onChange={handleInputData("firstName")}
                value={userDetails.firstName}
              />
            </div>

            <label className="text-lg leading-7 font-normal">Last Name</label>
            <div className="border-2 h-16 mb-8 mt-4">
              <input
                type="text"
                className="w-full h-full outline-none px-6 bg-bgWhite"
                placeholder="Doe"
                onChange={handleInputData("lastName")}
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
                onChange={handleInputData("phone")}
                value={userDetails.phone}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-2 mt-6 font-normal">
        <h2
          className="px-8 py-4 text-lg font-normal leading-7 bg-bgWhite cursor-pointer flex items-center"
          onClick={handleOpening}
        >
          <span className="mr-4">
            {isOpened ? <BsChevronUp /> : <BsChevronDown />}
          </span>{" "}
          Shipping Address (Optional)
        </h2>

        <div
          className={`${
            !isOpened && "hidden"
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
                onChange={handleInputData("address")}
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
                  onChange={handleInputData("city")}
                  value={userDetails.city}
                />
              </div>

              <div className=" flex-1  flex flex-col">
                <label className="text-lg leading-7">Zip Code</label>
                <input
                  type="text"
                  placeholder="XXXXXX"
                  className="w-full border-2 h-16 p-6 mt-4 bg-bgWhite outline-none"
                  onChange={handleInputData("zipCode")}
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
                onChange={handleInputData("state")}
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
    </div>
  );
};

export default ProfileTab;
