import useBreadcrumbs from "use-react-router-breadcrumbs";

const CurrentPageNav = () => {
  const breadcrumbs = useBreadcrumbs();
  let lastElement =
    breadcrumbs[breadcrumbs.length - 1].breadcrumb.props.children.split(" ");
  let secondToLastElement =
    breadcrumbs[breadcrumbs.length - 2].breadcrumb.props.children.split(" ");

  const capitalize = (words) => {
    if (words.length === 1) {
      return words;
    }
    return words
      .map((word) => {
        if (word === "or" || word === "and") {
          return word;
        } else {
          return word[0].toUpperCase() + word.substring(1);
        }
      })
      .join(" ");
  };

  lastElement = capitalize(lastElement);
  secondToLastElement = capitalize(secondToLastElement);

  return (
    <div className="h-[60px] bg-bgWhite flex justify-between items-center px-[160px] 2xl:px-72 font-normal text-base">
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
