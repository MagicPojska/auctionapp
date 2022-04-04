import Select from "react-select";

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

            <div className="flex space-x-6 mb-8">
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
    </div>
  );
};

export default ProfileTab;
