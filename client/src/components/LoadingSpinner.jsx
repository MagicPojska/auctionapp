const LoadingSpinner = ({ width }) => {
  return (
    <div
      className={`animate-spin rounded-full ${
        width ? width : "h-24 w-24"
      }  border-b-2 border-purple`}
    ></div>
  );
};

export default LoadingSpinner;
