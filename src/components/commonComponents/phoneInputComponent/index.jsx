import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const PhoneInputComponent = ({
  value = "",
  onChange,
  countryCode = "+41",
  onCountryCodeChange,
  placeholder = "Phone number",
  countryCodeValues = [],
  keyValue,
  className = "",
  readOnly,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const countryCodes = countryCodeValues;

  const toggleDropdown = () => {
    if (!readOnly) setIsOpen(!isOpen);
  };

  const selectCountryCode = (code, label) => {
    if (onCountryCodeChange) {
      onCountryCodeChange(code, label);
    }
    setIsOpen(false);
  };

  return (
    <div className={`flex ${className}`}>
      {/* Country code selector */}
      <div className="relative">
        <button
          type="button"
          className={`flex items-center justify-between w-fit !py-[6px] !px-[10px] text-[13px] border border-gray-300 rounded-l text-gray-700  ${
            readOnly
              ? "cursor-not-allowed bg-gray-100 text-gray-400"
              : "bg-white"
          }`}
          onClick={toggleDropdown}
          disabled={readOnly}
        >
          <span className="truncate">
            {countryCodes.find((c) => c.code === countryCode)?.label ||
              countryCode}
          </span>
          <ChevronDown className="size-4 ml-1 text-gray-500" />
        </button>

        {/* Dropdown for country selection */}
        {isOpen && (
          <div className="absolute top-full left-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
            {countryCodes.map((country) => (
              <button
                key={country.code}
                className="w-full !py-[6px] text-[13px] !px-[10px] text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                onClick={() => selectCountryCode(country.code, country.label)}
              >
                {country.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Phone number input */}
      <input
        type="tel"
        className={`flex-1 !py-[6px] !px-[10px] text-[13px] border border-l-0 border-gray-300 rounded-r focus:outline-none ${
          readOnly ? "bg-gray-100 cursor-not-allowed text-gray-400" : ""
        }`}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e, keyValue)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default PhoneInputComponent;
