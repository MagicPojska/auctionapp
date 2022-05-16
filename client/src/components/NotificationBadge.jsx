import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  clearAllNotifications,
  clearNotification,
  getAllNotifications,
} from "../utilities/notificationApi";
import { AiOutlineCheck } from "react-icons/ai";
import { shopProductPath } from "../utilities/paths";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const NotificationBadge = ({
  numberOfNotifications,
  setNumberOfNotifications,
}) => {
  const [isNotificationOpened, setIsNotificationOpened] = useState(false);
  const [hasMoreNotifications, setHasMoreNotifications] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notificationPageNumber, setNotificationPageNumber] = useState(0);

  const getNotifications = async (notificationPageNumber) => {
    try {
      const response = await getAllNotifications(notificationPageNumber);
      if (notificationPageNumber === 0) {
        setNotifications(response.data.content);
      } else {
        setNotifications([...notifications, ...response.data.content]);
      }
      setHasMoreNotifications(!response.data.last);
      setNotificationPageNumber(notificationPageNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const checkNotification = async (id) => {
    try {
      await clearNotification(id);
      setNotifications((notification) =>
        notification.map((n) => {
          if (n.id === id) {
            n.checked = true;
          }
          return n;
        })
      );
      setNumberOfNotifications(numberOfNotifications - 1);
    } catch (error) {
      console.log(error);
    }
  };

  const getNextNotifications = () => {
    getNotifications(notificationPageNumber + 1);
  };

  return (
    <div className="relative group">
      <button
        className="py-4 relative border-2 border-transparent text-white rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
        onClick={() => {
          setIsNotificationOpened(!isNotificationOpened);
          getNotifications(0);
        }}
      >
        <IoMdNotificationsOutline className="fill-white text-xl" />
        {numberOfNotifications > 0 && (
          <span className="absolute inset-0 object-right-top -mr-6 mt-2">
            <div className="inline-flex items-center px-1 py-0.25 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
              {numberOfNotifications}
            </div>
          </span>
        )}
      </button>

      <div
        className={`absolute z-10 ${
          isNotificationOpened ? "block" : "hidden"
        } -left-8`}
      >
        <div className="w-80 flex flex-col bg-white border-2">
          <div className="w-full flex justify-end text-black">
            <button
              className="p-2 text-purple font-bold"
              onClick={async () => {
                try {
                  const response = await clearAllNotifications();
                  setNotifications(response.data);
                  setNumberOfNotifications(0);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Clear all
            </button>
          </div>
          <div className="grid grid-cols-1 text-black max-h-96 overflow-auto">
            <InfiniteScroll
              dataLength={notifications.length}
              next={getNextNotifications}
              hasMoreNotifications={hasMoreNotifications}
              height={380}
            >
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`${
                    !notification.checked &&
                    (notification.type === "warning"
                      ? "bg-red-100"
                      : "bg-lightGreen")
                  } flex items-center border-t-2 border-b-2`}
                >
                  <Link
                    to={shopProductPath + "/" + notification.product.id}
                    className="flex flex-col"
                  >
                    <p className="px-6 pt-4 pb-1">
                      {notification.type === "success"
                        ? "Congratulations! You outbid the competition on product " +
                          notification.product.productName +
                          ", your bid of $" +
                          notification.product.highestBid +
                          " is the highest bid."
                        : "You have been outbid on product: " +
                          notification.product.productName}
                    </p>
                    <span className="px-6 pb-2 font-thin text-xs text-textTetriary">
                      {moment(notification.date).fromNow()}
                    </span>
                  </Link>
                  {!notification.checked && (
                    <button
                      className="mr-6 hover:text-xl"
                      onClick={() => {
                        checkNotification(notification.id);
                      }}
                    >
                      <AiOutlineCheck />
                    </button>
                  )}
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBadge;
