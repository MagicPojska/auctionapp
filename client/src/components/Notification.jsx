const Notification = ({ notification }) => {
  return (
    <div
      className={`w-full ${
        notification === "fail"
          ? "bg-lightOrange text-orange"
          : "bg-lightGreen text-green"
      }  py-5 px-72 mt-2 `}
    >
      {notification === "fail"
        ? "There are higher bids than yours. You could give a second try!"
        : "Congrats! You are the highest bider!"}
    </div>
  );
};

export default Notification;
