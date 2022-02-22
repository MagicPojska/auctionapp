const CurrentPageNav = ({ props }) => {
  return (
    <div className="h-[60px] bg-[#FCFCFC] flex justify-between items-center px-[160px] font-normal text-base">
      <span>{props}</span>
      <div className="font-normal text-base flex text-[#9B9B9B]">
        <span>Home &nbsp;</span> <icon className>&#10132; &nbsp;</icon>{" "}
        <span className="text-violet-400">{props}</span>
      </div>
    </div>
  );
};

export default CurrentPageNav;
