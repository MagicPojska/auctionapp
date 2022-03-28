import { useEffect, useRef } from "react";
import debounce from "lodash.debounce";

const PriceRangeSlider = ({
  getProducts,
  subCategories,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  minProductPrice,
  maxProductPrice,
}) => {
  const progressRef = useRef(null);

  const step = 1;
  const priceCap = 50;

  useEffect(() => {
    if (minValue || maxValue) {
      if (minValue) {
        progressRef.current.style.left =
          (minValue / maxProductPrice) * 100 + "%";
      }
      if (maxValue) {
        progressRef.current.style.right =
          100 - (maxValue / maxProductPrice) * 100 + "%";
      }
    } else {
      progressRef.current.style.left =
        (minProductPrice / maxProductPrice) * 100 + "%";
      progressRef.current.style.right =
        100 - (maxProductPrice / maxProductPrice) * 100 + "%";
    }
  }, [minValue, maxValue, maxProductPrice]);

  const handleMinSlider = (e) => {
    if (maxValue && maxValue - minValue >= priceCap) {
      setMinValue(e.target.value);
    } else {
      if (!maxValue || e.target.value < minValue) {
        setMinValue(e.target.value);
      }
    }
  };

  const handleMaxSlider = (e) => {
    if (minValue && maxValue - minValue >= priceCap) {
      setMaxValue(parseFloat(e.target.value));
    } else {
      if (!minValue || e.target.value > maxValue) {
        setMaxValue(e.target.value);
      }
    }
  };

  const onMinValueChange = (e) => {
    if (e.target.value.match("^[0-9.]*$") != null) {
      if (parseFloat(e.target.value) > parseFloat(maxValue)) {
        setMinValue(maxValue - 50);
      } else {
        setMinValue(e.target.value);
      }

      getProducts(0, subCategories, e.target.value, maxValue);
    }
  };

  const onMaxValueChange = (e) => {
    if (e.target.value.match("^[0-9.]*$") != null) {
      if (parseFloat(e.target.value) > parseFloat(maxProductPrice)) {
        setMaxValue(maxProductPrice);
        e.target.value = maxProductPrice;
      } else {
        setMaxValue(e.target.value);
      }

      const debouncedMaxValue = debounce(() => {
        if (parseFloat(e.target.value) < minValue) {
          e.target.value = parseFloat(minValue) + 50;
          setMaxValue(e.target.value);
          getProducts(0, subCategories, minValue, e.target.value);
        }
      }, 1000);
      debouncedMaxValue();

      if (parseFloat(e.target.value) > minValue) {
        getProducts(0, subCategories, minValue, e.target.value);
      }
    }
  };

  const filterByPrice = () => {
    getProducts(0, subCategories, minValue, maxValue);
  };

  return (
    <div className="w-64 min-w-max h-max border-2 p-6 mt-6">
      <h3 className="text-base font-bold text-purple mb-8">Price range</h3>

      <div className="flex justify-between items-center ">
        <div className="flex h-12 border-2">
          <input
            type="text"
            onChange={onMinValueChange}
            value={minValue}
            className="focus:outline-none w-20 text-center"
            placeholder={"$" + minProductPrice}
          />
        </div>
        <p className="font-normal">-</p>
        <div className="flex h-12 border-2">
          <input
            type="text"
            onChange={onMaxValueChange}
            value={maxValue}
            className="focus:outline-none w-20 text-center"
            placeholder={"$" + maxProductPrice}
          />
        </div>
      </div>

      <div className="mt-20">
        <div className="slider relative h-1 rounded-md bg-gray-300">
          <div
            className="absolute h-1 bg-purple rounded "
            ref={progressRef}
          ></div>
        </div>

        <div className="relative">
          <input
            type="range"
            className="range-min absolute w-full -top-1 h-1   bg-transparent appearance-none pointer-events-none"
            //Since minValue and maxValue don't have initial state this will check if the don't have one and assign them a starting state in this case minimum
            onMouseDown={() => {
              if (!minValue) {
                setMinValue(minProductPrice);
              }
            }}
            onChange={handleMinSlider}
            onMouseUp={filterByPrice}
            min={minProductPrice}
            step={step}
            max={maxProductPrice}
            value={minValue ? minValue : minProductPrice}
          />

          <input
            type="range"
            className="range-max absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
            onMouseDown={() => {
              if (!maxValue) {
                setMaxValue(maxProductPrice);
              }
            }}
            onChange={handleMaxSlider}
            onMouseUp={filterByPrice}
            min={minProductPrice}
            step={step}
            max={maxProductPrice}
            value={maxValue ? maxValue : maxProductPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
