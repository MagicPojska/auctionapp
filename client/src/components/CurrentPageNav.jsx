import useBreadcrumbs from "use-react-router-breadcrumbs";

const CurrentPageNav = ({ props }) => {
  const breadcrumbs = useBreadcrumbs();
  let lastElement =
    breadcrumbs[breadcrumbs.length - 1].breadcrumb.props.children;
  let secondToLastElement =
    breadcrumbs[breadcrumbs.length - 2].breadcrumb.props.children;

  return (
    <div className="h-[60px] bg-bgWhite flex justify-between items-center px-[160px] font-normal text-base">
      <span>{lastElement}</span>
      <div className="font-normal text-base flex text-textTetriary">
        <span>{secondToLastElement} &nbsp;</span>
        <p>&#10132; &nbsp;</p>
        <span className="text-purple font-bold">{lastElement}</span>
      </div>
    </div>
  );
};

export default CurrentPageNav;
