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
