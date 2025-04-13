import React, { useState, useEffect } from "react";
import FloatingPlaceholder from "./floatingplaceolder";

const FloatingLabelInput = ({
  label,
  type = "text",
  value = "",
  onChange,
  onBlur = null,
  onKeyDown = null,
  id,
  keyValue,
  showDropdown = false,
  name,
  required = false,
  autoComplete = "on",
  mandatory = false,
  labelClassName = "",
  dropDownComponent,
  readOnly,
  className = "",
  placeholder = "",
  error = "",
  rightIcon = null,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Update focus state when value changes
  useEffect(() => {
    setIsFocused(value ? true : false);
  }, [value]);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setIsFocused(false);
    }

    // Call the onBlur callback if provided
    if (onBlur) {
      onBlur(e, true);
    }
  };

  const handleKeyDown = (e) => {
    // Call the onKeyDown callback if provided
    if (onKeyDown && e.key === "Enter") {
      onKeyDown(e, false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const actualType = type === "password" && showPassword ? "text" : type;

  const baseClasses = `block w-full px-3 py-[14px] text-[14px]  rounded border-[1px] focus:outline-none ${
    error ? "border-red-500" : "border-[#DADBE5]"
  } text-[#231F20] caret-[#022B50] ${
    error
      ? "border-red-500"
      : isFocused
      ? "border-[#DADBE5] focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300"
      : "border-[#DADBE5]"
  }`;

  return (
    <div className="relative w-full">
      <FloatingPlaceholder
        className={`${labelClassName} `}
        isFocused={isFocused}
        hasError={!!error}
      >
        <span
          style={{ fontSize: isFocused ? "11px" : "13px" }}
          className={`${labelClassName}  ${
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
          type={actualType}
          name={name}
          value={value || ""}
          onChange={(e) => onChange(e, keyValue)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoComplete={autoComplete}
          required={required}
          readOnly={readOnly}
          className={`${baseClasses} ${readOnly && "bg-gray-100"} ${
            rightIcon ? "pr-10" : ""
          } ${className}`}
          placeholder={isFocused ? placeholder : ""}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {!showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}

        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {typeof rightIcon === "function" ? rightIcon() : rightIcon}
          </div>
        )}
        {showDropdown && dropDownComponent && <div className="absolute z-[999] shadow-md w-full bg-white">{dropDownComponent}</div>}
      </div>

      {/* {error && <p className="mt-1 text-sm text-red-500">{error}</p>} */}
    </div>
  );
};

export default FloatingLabelInput;
