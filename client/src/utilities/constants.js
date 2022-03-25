export const NOTIFICATION_SUCCESS = "success";
export const NOTIFICATION_FAIL = "fail";

export const SORT_BY = [
  {
    value: "productName",
    label: "Default Sorting",
    sortBy: "productName",
    orderBy: "ascending",
  },
  {
    value: "startDate",
    label: "Added: New to Old",
    sortBy: "startDate",
    orderBy: "descending",
  },
  {
    value: "endDate",
    label: "Time left",
    sortBy: "endDate",
    orderBy: "ascending",
  },
  {
    value: "startPrice",
    label: "Price: Low to High",
    sortBy: "startPrice",
    orderBy: "ascending",
  },
  {
    value: "highPrice",
    label: "Price: High to Low",
    sortBy: "startPrice",
    orderBy: "descending",
  },
];

export const GRID = "grid";
export const LIST = "list";
