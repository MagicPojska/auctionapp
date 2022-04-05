import moment from "moment";

export const capitalizeWord = (e) => {
  return e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
};

export const calculateTimeLeft = (response) => {
  const startDate = moment();
  const endDate = moment(response.data.endDate);

  const diff = endDate.diff(startDate);
  const diffDuration = moment.duration(diff);

  const daysBetween = endDate.diff(startDate, "days");

  const differenceInTime = {
    weeks: Math.floor(daysBetween / 7),
    days: daysBetween % 7,
    hours: diffDuration.hours(),
    minutes: diffDuration.minutes(),
  };
  return differenceInTime;
};

export const parseTimeLeft = (timeLeft) => {
  return timeLeft.minutes < 0
    ? "Expired"
    : timeLeft.weeks > 0
    ? `${timeLeft.weeks} ${timeLeft.weeks === 1 ? "Week" : "Weeks"} ${
        timeLeft.days % 7
      } ${timeLeft.days === 1 ? "Day" : "Days"}`
    : timeLeft.days > 0
    ? `${timeLeft.days} ${timeLeft.days === 1 ? "Day" : "Days"} ${
        timeLeft.days
      } ${timeLeft.hours === 1 ? "Hour" : "Hours"}`
    : `${timeLeft.hours} ${timeLeft.hours === 1 ? "Hour" : "Hours"} ${
        timeLeft.minutes
      } ${timeLeft.minutes === 1 ? "Minute" : "Minutes"}`;
};

export const generateYears = () => {
  const years = [];

  const startYear = 1900;
  const endYear = new Date().getFullYear();

  for (let i = endYear; i >= startYear; i--) {
    years.push({
      value: i,
      label: i,
    });
  }

  return years;
};

export const generateMonths = () => {
  const months = [];

  for (let i = 1; i <= 12; i++) {
    months.push({
      value: i,
      label: i,
    });
  }

  return months;
};

export const generateDays = (year, month) => {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let daysInMonth = days[month - 1];
  if (month === 2 && year % 4 === 0) {
    daysInMonth = 29;
  }
  const daysArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push({
      value: i,
      label: i,
    });
  }

  return daysArray;
};
