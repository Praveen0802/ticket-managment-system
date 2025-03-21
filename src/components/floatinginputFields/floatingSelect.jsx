import { useEffect, useRef, useState } from "react";
import FloatingPlaceholder from "./floatingplaceolder";

const FloatingSelect = ({
  options = [],
  label = "Select",
  selectedValue = null,
  onSelect,
  placeholder = "",
  className = "",
  paddingClassName = "px-3 py-[14px]", // Default padding that can be overridden by parent
  error = "",
  id,
  name,
  required = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedValue);
  const [isFocused, setIsFocused] = useState(selectedValue ? true : false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        // Only unfocus if no value is selected
        if (!selected) {
          setIsFocused(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selected]);

  // Update selected value when prop changes
  useEffect(() => {
    setSelected(selectedValue);
    if (selectedValue) {
      setIsFocused(true);
    }
  }, [selectedValue]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    setIsFocused(true); // Keep label floating after selection
    if (onSelect) {
      onSelect(option);
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setIsFocused(true); // Always float label when dropdown is opened
    }
  };

  // Find the currently selected option's label
  const getSelectedLabel = () => {
    if (!selected) return "";

    const selectedOption = options.find(
      (option) => option.value === selected || option === selected
    );

    return selectedOption ? selectedOption.label || selectedOption : "";
  };

  // Base classes without padding (which is now customizable)
  const baseClasses = `block w-full text-[14px] shadow-sm rounded border-[1px] focus:outline-none ${
    error ? "border-red-500" : "border-[#DADBE5]"
  } text-[#231F20] ${
    error
      ? "border-red-500"
      : isFocused
      ? "border-[#DADBE5]"
      : "border-[#DADBE5]"
  } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white cursor-pointer"}`;

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <FloatingPlaceholder isFocused={isFocused || isOpen} hasError={!!error}>
        <span
          style={{ fontSize: isFocused || isOpen ? "11px" : "13px" }}
          className={`${error ? "text-red-500" : "text-[#808082]"}`}
        >
          {label}
        </span>
      </FloatingPlaceholder>

      <div
        onClick={toggleDropdown}
        className={`${baseClasses} ${paddingClassName} flex items-center justify-between relative`}
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${id}-label`}
        tabIndex={disabled ? -1 : 0}
      >
        <span className={`block truncate ${!selected ? "text-gray-400" : ""}`}>
          {getSelectedLabel() || (isFocused ? placeholder : "")}
        </span>
        <svg
          className={`w-5 h-5 ml-2 text-[#130061] transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          } ${disabled ? "text-gray-400" : ""}`}
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
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-[99] w-full mt-1 bg-white rounded-md shadow-lg">
          <ul
            className="py-1 overflow-auto text-[14px] rounded-md max-h-60 focus:outline-none"
            role="listbox"
            id={`${id}-listbox`}
          >
            {options.map((option, index) => {
              const value = option.value !== undefined ? option.value : option;
              const label = option.label !== undefined ? option.label : option;
              const isSelectedOption =
                selected === value || selected === option;

              return (
                <li
                  key={index}
                  className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 ${
                    isSelectedOption
                      ? "bg-indigo-100 text-[#130061]"
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

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FloatingSelect;
