const CurrentPageNav = ({ props }) => {
  return (
    <div className="h-[60px] bg-bgWhite flex justify-between items-center px-[160px] font-normal text-base">
      <span>{props}</span>
      <div className="font-normal text-base flex text-textTetriary">
        <span>Home &nbsp;</span>
        <p className>&#10132; &nbsp;</p>
        <span className="text-purple font-bold">{props}</span>
      </div>
    </div>
  );
};

export default CurrentPageNav;
