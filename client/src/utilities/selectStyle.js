export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "0",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    border: "2px solid #e5e7eb",
    fontFamily: "Lato, sans-serif",
    fontWeight: "400",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#e5e7eb",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "#8367D8" : "white",
    "&:hover": {
      backgroundColor: "#8367D8",
      color: "white",
    },
    fontFamily: "Lato, sans-serif",
    fontWeight: "400",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "0",
  }),
};
