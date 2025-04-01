import React, { useState, useEffect, useRef } from "react";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import FloatingPlaceholder from "@/components/floatinginputFields/floatingplaceolder";

const FloatingDateRange = ({
  label,
  value = { startDate: "", endDate: "" }, // Add value prop with default
  onChange,
  id,
  keyValue,
  name,
  required = false,
  mandatory = false,
  labelClassName = "",
  readOnly,
  className = "",
  error = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(value.startDate || "");
  const [endDate, setEndDate] = useState(value.endDate || "");
  const [displayValue, setDisplayValue] = useState("");
  const dropdownRef = useRef(null);

  // Format and set display value when value prop changes
  useEffect(() => {
    if (value?.startDate && value?.endDate) {
      const formattedStart = new Date(value.startDate).toLocaleDateString();
      const formattedEnd = new Date(value.endDate).toLocaleDateString();
      setDisplayValue(`${formattedStart} - ${formattedEnd}`);
      setStartDate(value.startDate);
      setEndDate(value.endDate);
    } else {
      setDisplayValue("");
      setStartDate("");
      setEndDate("");
    }
  }, [value]);

  // Update focus state when display value changes
  useEffect(() => {
    setIsFocused(displayValue ? true : false);
  }, [displayValue]);

  // Handle outside clicks
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

  const handleInputClick = () => {
    if (!readOnly) {
      setIsOpen(!isOpen);
      setIsFocused(true);
    }
  };

  const handleApply = () => {
    if (startDate && endDate) {
      const formattedStart = new Date(startDate).toLocaleDateString();
      const formattedEnd = new Date(endDate).toLocaleDateString();
      setDisplayValue(`${formattedStart} - ${formattedEnd}`);

      if (onChange) {
        onChange({ startDate, endDate }, keyValue);
      }
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setDisplayValue("");
    if (onChange) {
      onChange({ startDate: "", endDate: "" }, keyValue);
    }
  };

  const baseClasses = `block w-full px-3 py-[14px] text-[14px] shadow-sm rounded border-[1px] focus:outline-none ${
    error ? "border-red-500" : "border-[#DADBE5]"
  } text-[#231F20] caret-[#022B50] ${
    error
      ? "border-red-500"
      : isFocused
      ? "border-[#DADBE5] focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300"
      : "border-[#DADBE5]"
  }`;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <FloatingPlaceholder
        className={`${labelClassName} ${readOnly && "bg-gray-100"}`}
        isFocused={isFocused}
        hasError={!!error}
      >
        <span
          style={{ fontSize: isFocused ? "11px" : "13px" }}
          className={`${labelClassName} ${readOnly && "bg-gray-100"} ${
            error ? "text-red-500" : "text-[#808082]"
          }`}
        >
          {label}
          {mandatory ? "*" : ""}
        </span>
      </FloatingPlaceholder>

      <div className="relative">
        <input
          id={id}
          type="text"
          name={name}
          value={displayValue}
          readOnly
          onClick={handleInputClick}
          className={`${baseClasses} ${
            readOnly && "bg-gray-100"
          } pr-10 cursor-pointer ${className}`}
          placeholder=""
          required={required}
        />

        <div
          className="absolute right-3 z-[10] bg-white top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={handleInputClick}
        >
          <IconStore.calendar className="h-5 w-5" />
        </div>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-full p-3">
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md text-sm p-2"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md text-sm p-2"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleClear}
                className="flex-1 py-1.5 px-3 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                Clear
              </button>
              <button
                onClick={handleApply}
                className="flex-1 py-1.5 px-3 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                disabled={!startDate || !endDate}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingDateRange;
