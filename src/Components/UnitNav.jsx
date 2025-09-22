import checkmarkIcon from "/icon-checkmark.svg";
import dropdown from "/icon-dropdown.svg";
import unitIcon from "/icon-units.svg";
import { useState } from "react";
import { clsx } from "clsx";

const UnitNav = ({ units, setUnits, isMetric, setIsMetric }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sections = {
    temperature: ["C", "F"],
    wind: ["km/h", "mph"],
    precipitation: ["mm", "in"],
  };

  
  const updateUnit = (category, value) => {
    setUnits((prev) => ({ ...prev, [category]: value }));
  };

  
  const handleSystemSwitch = () => {
    setIsMetric((prev) => !prev);
    setUnits({
      temperature: !isMetric ? "C" : "F",
      wind: !isMetric ? "km/h" : "mph",
      precipitation: !isMetric ? "mm" : "in",
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex space-x-2 bg-neutral-800 py-1 focus:border-[1px] px-2 rounded-md focus:border-neutral-0"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img src={unitIcon} alt="unit-icon" />
        <p className="text-white">Units</p>
        <img src={dropdown} alt="dropdown icon" />
      </button>

      {isOpen && (
        <div className="absolute z-10 flex flex-col bg-neutral-700 w-52 p-2 mt-4 right-0 rounded-md text-white">
          
          <button
            className="bg-neutral-600 rounded-md p-1 text-sm text-left focus:border-[1px] focus:border-neutral-0"
            onClick={handleSystemSwitch}
          >
            <h3>Switch to {isMetric ? "imperial" : "metric"}</h3>
          </button>

          
          {Object.entries(sections).map(([category, values]) => (
            <div
              key={category}
              className="p-1 space-y-1 border-b-[1px] border-neutral-500 mt-1 last:border-none"
            >
              <h4 className="text-xs text-neutral-400">{category}</h4>

              {values.map((val) => {
                const isActive = units[category] === val;

                return (
                  <button
                    key={val}
                    onClick={() => updateUnit(category, val)}
                    className={clsx(
                      "flex justify-between rounded-md p-1 text-sm w-full text-left",
                      isActive ? "bg-neutral-600" : "bg-transparent"
                    )}
                  >
                    <p>
                      {val === "C"
                        ? "Celsius °C"
                        : val === "F"
                        ? "Fahrenheit °F"
                        : val}
                    </p>
                    <img
                      src={checkmarkIcon}
                      alt="checkmark"
                      className={isActive ? "flex" : "hidden"}
                    />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UnitNav;
