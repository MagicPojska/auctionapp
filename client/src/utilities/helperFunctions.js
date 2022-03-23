import moment from "moment";

export const capitalizeWord = (e) => {
  return e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
};

export const calculateTimeLeft = (response) => {
  const startDate = moment();
  const endDate = new Date(response.data.endDate);

  const date = endDate - startDate;

  const diff = {
    weeks: moment.duration(date).weeks(),
    days: moment.duration(date).days(),
    hours: moment.duration(date).hours(),
    minutes: moment.duration(date).minutes(),
  };
  return diff;
};

export const parseTimeLeft = (timeLeft) => {
  return timeLeft.minutes < 0
    ? "Expired"
    : timeLeft.weeks > 0
    ? `${timeLeft.weeks} ${
        timeLeft.weeks === 1 ? "Week" : "Weeks"
      } ${Math.floor(timeLeft.days % 7)} ${
        timeLeft.days === 1 ? "Day" : "Days"
      }`
    : timeLeft.days > 0
    ? `${timeLeft.days} ${timeLeft.days === 1 ? "Day" : "Days"} ${
        timeLeft.days
      } ${timeLeft.hours === 1 ? "Hour" : "Hours"}`
    : `${timeLeft.hours} ${timeLeft.hours === 1 ? "Hour" : "Hours"} ${
        timeLeft.minutes
      } ${timeLeft.minutes === 1 ? "Minute" : "Minutes"}`;
};
