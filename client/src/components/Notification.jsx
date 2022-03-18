import { AiFillCloseCircle } from "react-icons/ai";

const Notification = ({ notification, setNotification }) => {
  return (
    <div
      className={`w-full flex justify-between ${
        notification === "fail"
          ? "bg-lightOrange text-orange"
          : "bg-lightGreen text-green"
      }  py-5 px-40 2xl:px-72 mt-2 `}
    >
      <p>
        {notification === "fail"
          ? "There are higher bids than yours. You could give a second try!"
          : "Congrats! You are the highest bider!"}
      </p>
      <button onClick={() => setNotification("")}>
        <AiFillCloseCircle />
      </button>
    </div>
  );
};

export default Notification;
