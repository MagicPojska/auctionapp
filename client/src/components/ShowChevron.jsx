import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const ShowChevron = ({ isChevronOpened }) => {
  return (
    <span className="mr-4">
      {isChevronOpened ? <BsChevronUp /> : <BsChevronDown />}
    </span>
  );
};

export default ShowChevron;
