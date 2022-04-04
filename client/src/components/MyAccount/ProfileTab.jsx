import Select from "react-select";
import { countryList } from "../../utilities/countryList";

import { customStyles } from "../../utilities/selectStyle";

const ProfileTab = () => {
  return (
    <div className="mt-16">
      <div className="w-full border-2">
        <h2 className="px-8 py-4 text-lg font-normal leading-7 bg-bgWhite">
          Personal Information
        </h2>

        <div className="pt-5 pl-5 2xl:pl-20 pr-24 2xl:pr-36 flex">
          <div className="flex flex-col items-center space-y-6 mr-28 min-w-fit">
            <img
              className="h-80 w-80 rounded-full mb-5"
              src="/images/placeholder.png"
              alt="profile-photo"
            />
            <label className="w-full text-center py-3 border-4 border-purple">
              <input type="file" />
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
              />
            </div>

            <label className="text-lg leading-7 font-normal">Last Name</label>
            <div className="border-2 h-16 mb-8 mt-4">
              <input
                type="text"
                className="w-full h-full outline-none px-6 bg-bgWhite"
                placeholder="Doe"
              />
            </div>

            <label className="text-lg leading-7 font-normal">
              Email Adress
            </label>
            <div className="border-2 h-16 mb-8 mt-4">
              <input
                type="text"
                disabled={true}
                className="w-full h-full outline-none px-6 bg-textSecondary"
                placeholder="user@domain.com"
              />
            </div>

            <label className="text-lg leading-7 font-normal">
              Date of Birth
            </label>
            <div className="flex space-x-6 mb-8 mt-4">
              <Select
                className="flex-1"
                placeholder="DD"
                styles={customStyles}
                isSearchable={false}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />

              <Select
                className="flex-1"
                placeholder="MM"
                styles={customStyles}
                isSearchable={false}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />

              <Select
                className="flex-1"
                placeholder="YYYY"
                styles={customStyles}
                isSearchable={false}
                components={{
                  IndicatorSeparator: () => null,
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
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-2 mt-6 font-normal">
        <h2 className="px-8 py-4 text-lg font-normal leading-7 bg-bgWhite">
          Shipping Address (Optional)
        </h2>

        <div className="pt-5 pl-5 2xl:pl-20 pr-24 2xl:pr-36 flex">
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
              />
            </div>

            <div className="flex space-x-6 mb-8">
              <div className=" flex-1  flex flex-col">
                <label className="text-lg leading-7">City</label>
                <input
                  type="text"
                  placeholder="eg. Madrid"
                  className="w-full border-2 h-16 p-6 mt-4 bg-bgWhite outline-none"
                />
              </div>

              <div className=" flex-1  flex flex-col">
                <label className="text-lg leading-7">Zip Code</label>
                <input
                  type="number"
                  placeholder="XXXXXX"
                  className="w-full border-2 h-16 p-6 mt-4 bg-bgWhite outline-none"
                />
              </div>
            </div>

            <label className="text-lg leading-7">State</label>
            <div className="border-2 h-16 mb-8 mt-4">
              <input
                type="text"
                className="w-full h-full outline-none px-6 bg-bgWhite"
                placeholder="eg. Asturias"
              />
            </div>

            <label className="text-lg leading-7">Country</label>
            <Select
              options={countryList}
              className="mb-8 mt-4"
              placeholder="eg. Spain"
              styles={customStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
