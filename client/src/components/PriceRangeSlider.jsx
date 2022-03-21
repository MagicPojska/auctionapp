import { useState, useEffect, useRef } from "react";
import { getProductPriceRange } from "../utilities/productsApi";

const PriceRangeSlider = ({ getProducts, subCategories }) => {
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const step = 1;
  const priceCap = 50;

  useEffect(() => {
    (async () => {
      const response = await getProductPriceRange();
      setMinValue(response.data.min);
      setMaxValue(response.data.max);
      setMin(parseFloat(response.data.min));
      setMax(parseFloat(response.data.max));
    })();
  }, []);

  useEffect(() => {
    progressRef.current.style.left = (minValue / max) * 100 + "%";
    progressRef.current.style.right = 100 - (maxValue / max) * 100 + "%";
  }, [minValue, maxValue, max]);

  const handleMin = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseFloat(e.target.value) < parseFloat(maxValue)) {
        setMinValue(e.target.value);
      }
    } else {
      if (parseFloat(e.target.value) < parseFloat(minValue)) {
        setMinValue(e.target.value);
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseFloat(e.target.value) > parseFloat(minValue)) {
        setMaxValue(parseFloat(e.target.value));
      }
    } else {
      if (parseFloat(e.target.value) > parseFloat(maxValue)) {
        setMaxValue(parseFloat(e.target.value));
      }
    }
  };

  const onMinValueChange = async (e) => {
    if (e.target.value.match("^[0-9.]*$") != null) {
      if (parseFloat(e.target.value) > parseFloat(maxValue)) {
        setMinValue(maxValue - 10);
      } else {
        setMinValue(e.target.value);
      }
    }
    await getProducts(0, subCategories, e.target.value, maxValue);
  };

  const onMaxValueChange = async (e) => {
    if (e.target.value.match("^[0-9.]*$") != null) {
      if (parseFloat(e.target.value) > max) {
        setMaxValue(max);
      } else {
        setMaxValue(e.target.value);
      }
    }
    await getProducts(0, subCategories, minValue, e.target.value);
  };

  const filterByPrice = async () => {
    await getProducts(0, subCategories, minValue, maxValue);
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
            placeholder="$10"
          />
        </div>
        <p className="font-normal">-</p>
        <div className="flex h-12 border-2">
          <input
            type="text"
            onChange={onMaxValueChange}
            onBlur={(e) => {
              if (parseFloat(e.target.value) < minValue) {
                setMaxValue(parseFloat(minValue) + 10);
              }
            }}
            value={maxValue}
            className="focus:outline-none w-20 text-center"
            placeholder="+$1000"
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
            onChange={handleMin}
            onMouseUp={filterByPrice}
            min={min}
            step={step}
            max={max}
            value={minValue}
          />

          <input
            type="range"
            className="range-max absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
            onChange={handleMax}
            onMouseUp={filterByPrice}
            min={min}
            step={step}
            max={max}
            value={maxValue}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
