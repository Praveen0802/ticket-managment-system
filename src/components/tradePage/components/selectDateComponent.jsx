import FloatingPlaceholder from "@/components/floatinginputFields/floatingplaceolder";
import React, { useState, useRef, useEffect } from "react";

const SelectDateComponent = ({
  label = "Date Range",
  selectedValue = null,
  onChange,
  className = "",
  mandatory = false,
  paddingClassName = "px-3 py-[14px]",
  error = "",
  id,
  labelClassName = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedValue || "Any date");
  const [isFocused, setIsFocused] = useState(selectedValue ? true : false);
  const dropdownRef = useRef(null);

  const dateOptions = [
    { value: "any", label: "Any date" },
    { value: "today", label: "Today" },
    { value: "next7", label: "Next 7 days" },
    { value: "next30", label: "Next 30 days" },
    { value: "next60", label: "Next 60 days" },
    { value: "custom", label: "Custom range" },
  ];

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
    if (selectedValue) {
      setSelected(selectedValue);
      setIsFocused(true);
    }
  }, [selectedValue]);

  const handleSelect = (option) => {
    setSelected(option.label);
    setIsOpen(false);
    setIsFocused(true);
    if (onChange) {
      onChange(option.value);
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setIsFocused(true);
    }
  };

  // Base classes without padding (which is customizable)
  const baseClasses = `block w-full text-[14px] rounded border-[1px] focus:outline-none ${
    error ? "border-red-500" : "border-[#DADBE5]"
  } text-[#231F20] ${
    error
      ? "border-red-500"
      : isFocused
      ? "border-[#DADBE5] focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300"
      : "border-[#DADBE5]"
  } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white cursor-pointer"}`;

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      <FloatingPlaceholder
        className={`${labelClassName} ${disabled && "!bg-gray-100"}`}
        isFocused={isFocused || isOpen}
        hasError={!!error}
      >
        <span
          style={{ fontSize: isFocused || isOpen ? "11px" : "13px" }}
          className={`${labelClassName} ${
            error ? "text-red-500" : "text-[#808082]"
          }`}
        >
          {label}
          {mandatory ? "*" : ""}
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
        <div className="flex items-center">
          <svg 
            className="w-5 h-5 text-purple-800 mr-2" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" />
          </svg>
          <span>{selected}</span>
        </div>

        <div>
          <svg
            className={`w-5 h-5 text-purple-800 transition-transform duration-200 ${
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
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg">
          <div className="grid grid-cols-2 gap-2 p-2">
            {dateOptions.map((option, index) => (
              <button
                key={index}
                className={`text-left p-3 rounded hover:bg-indigo-50 ${
                  selected === option.label ? "bg-indigo-100 text-purple-800" : "text-gray-900"
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectDateComponent;