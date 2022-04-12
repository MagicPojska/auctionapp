import { useUserContext } from "../../contexts/UserContextProvider";
import { deactivateUserAccount } from "../../utilities/userApi";

const SettingsTab = () => {
  const { user, logout } = useUserContext();

  const deactivateUser = async () => {
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      try {
        await deactivateUserAccount(user.id);
        await logout();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mt-16 grid grid-cols-2 gap-6">
      <div className="flex-1 border-2 px-8 pb-12">
        <h3 className="py-4 text-lg font-normal leading-7 bg-bgWhite mb-4">
          Policy and Community
        </h3>
        <h2 className="text-lg font-bold leading-7 pr-12 mb-8">
          Receive updates on bids and seller's offers. Stay informed through:
        </h2>

        <div className="flex space-x-10 font-normal mb-6">
          <input type="checkbox" className="accent-purple" />
          <label>Email</label>
        </div>

        <div className="flex space-x-10 font-normal mb-6">
          <input type="checkbox" className="accent-purple" />
          <label>Push Notifications</label>
        </div>

        <div className="flex space-x-10 font-normal">
          <input type="checkbox" className="accent-purple" />
          <label>SMS Notifications</label>
        </div>
      </div>

      <div className="flex-1 border-2 px-8 pb-12">
        <h3 className="py-4 text-lg font-normal leading-7 bg-bgWhite mb-4">
          Policy and Community
        </h3>
        <h2 className="text-lg font-bold leading-7 pr-12 mb-8">
          This information can be edited on your profile.
        </h2>

        <p className="mb-4">
          Email
          <span className="font-normal text-purple ml-8">{user.email}</span>
        </p>

        <p>
          Phone
          <span className="font-normal text-purple ml-8">{user.phone}</span>
        </p>
      </div>

      <div className="flex-1 border-2 px-8 pb-12">
        <h3 className="py-4 text-lg font-normal leading-7 bg-bgWhite mb-4">
          Policy and Community
        </h3>
        <h2 className="text-lg font-bold leading-7 pr-12 mb-8">
          Do you want to deactivate account?
        </h2>

        <button
          onClick={deactivateUser}
          className="px-8 py-3 border-4 font-bold"
        >
          DEACTIVATE
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
