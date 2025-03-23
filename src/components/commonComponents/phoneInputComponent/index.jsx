import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const PhoneInputComponent = ({
  value = "",
  onChange,
  countryCode = "+41",
  onCountryCodeChange,
  placeholder = "Phone number",
  keyValue,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Sample country codes - expand this list as needed
  const countryCodes = [
    { code: "+41", label: "CH +41" },
    { code: "+1", label: "US +1" },
    { code: "+44", label: "UK +44" },
    { code: "+971", label: "UAE +971" },
    { code: "+91", label: "IN +91" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

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
          className="flex items-center justify-between w-fit px-3 py-2 border border-gray-300 rounded-l text-gray-700 bg-white"
          onClick={toggleDropdown}
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
                className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
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
        className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r focus:outline-none "
        value={value}
        onChange={(e) => onChange && onChange(e, keyValue)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default PhoneInputComponent;
