import CurrentPageNav from "./CurrentPageNav";

const PageLayout = ({ children }) => {
  return (
    <>
      <CurrentPageNav />
      {children}
    </>
  );
};

export default PageLayout;
