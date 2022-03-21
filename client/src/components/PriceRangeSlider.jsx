import { useState, useEffect, useRef } from "react";

const PriceRangeSlider = () => {
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const min = 10;
  const max = 450;
  const step = 1;
  const priceCap = 50;

  useEffect(() => {
    progressRef.current.style.left = (minValue / max) * 100 + "%";
    progressRef.current.style.right = 100 - (maxValue / max) * 100 + "%";
  }, [minValue, maxValue, max, step]);

  const handleMin = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  return (
    <div className="w-64 min-w-max h-max border-2 p-6 mt-6">
      <h3 className="text-base font-bold text-purple mb-8">Price range</h3>

      <div className="flex justify-between items-center ">
        <div className="flex h-12 border-2">
          <input
            type="text"
            onChange={(e) => {
              if (e.target.value > maxValue) {
                setMinValue(maxValue - 10);
              } else {
                setMinValue(e.target.value);
              }
            }}
            value={minValue}
            className="focus:outline-none w-20 text-center"
            placeholder="$10"
          />
        </div>
        <p className="font-normal">-</p>
        <div className="flex h-12 border-2">
          <input
            type="text"
            onChange={(e) => {
              setMaxValue(e.target.value);
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
            min={min}
            step={step}
            max={max}
            value={minValue}
          />

          <input
            type="range"
            className="range-max absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
            onChange={handleMax}
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
