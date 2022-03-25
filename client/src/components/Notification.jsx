import { AiFillCloseCircle } from "react-icons/ai";

const Notification = ({ notification, setNotification }) => {
  return (
    <div
      className={`w-full flex justify-between ${
        notification.type === "fail"
          ? "bg-lightOrange text-orange"
          : "bg-lightGreen text-green"
      }  py-5 px-40 2xl:px-72 mt-2 `}
    >
      <p>{notification.message}</p>
      <button onClick={() => setNotification("")}>
        <AiFillCloseCircle />
      </button>
    </div>
  );
};

export default Notification;
