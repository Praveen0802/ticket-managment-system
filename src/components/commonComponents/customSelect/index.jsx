import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({
  options = [],
  selectedValue = null,
  onSelect,
  placeholder = "Today",
  className = "",
  textSize = "text-lg", // Default text size
  buttonPadding = "px-4 py-2", // Default button padding
  dropdownItemPadding = "py-2 pl-3 pr-9", // Default dropdown item padding
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedValue);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update selected value when prop changes
  useEffect(() => {
    setSelected(selectedValue);
  }, [selectedValue]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Find the currently selected option's label
  const getSelectedLabel = () => {
    if (!selected && placeholder) return placeholder;

    const selectedOption = options.find(
      (option) => option.value === selected || option === selected
    );

    return selectedOption
      ? selectedOption.label || selectedOption
      : placeholder;
  };

  return (
    <div className={`relative  w-fit ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`flex items-center justify-between  ${buttonPadding} ${textSize} text-left text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-indigo-900 font-medium">
          {getSelectedLabel()}
        </span>
        <svg
          className={`w-5 h-5 ml-2 text-indigo-900 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          <ul
            className={`py-1 overflow-auto ${textSize} rounded-md max-h-60 focus:outline-none`}
            role="listbox"
          >
            {options.map((option, index) => {
              const value = option.value !== undefined ? option.value : option;
              const label = option.label !== undefined ? option.label : option;
              const isSelectedOption =
                selected === value || selected === option;

              return (
                <li
                  key={index}
                  className={`cursor-pointer select-none relative ${dropdownItemPadding} hover:bg-indigo-50 ${
                    isSelectedOption
                      ? "bg-indigo-100 text-indigo-900"
                      : "text-gray-900"
                  }`}
                  id={`option-${index}`}
                  role="option"
                  aria-selected={isSelectedOption}
                  onClick={() =>
                    handleSelect(value !== undefined ? value : option)
                  }
                >
                  <span
                    className={`block truncate ${
                      isSelectedOption ? "font-medium" : "font-normal"
                    }`}
                  >
                    {label}
                  </span>

                  {isSelectedOption && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
