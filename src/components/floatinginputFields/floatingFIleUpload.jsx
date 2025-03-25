import React, { useState, useRef } from "react";
import FloatingPlaceholder from "./floatingplaceolder";

const FloatingFileUpload = ({
  label,
  value,
  onChange,
  id,
  keyValue,
  name,
  required = false,
  mandatory = false,
  labelClassName = "",
  disabled = false,
  className = "",
  error = "",
  accept = "",
  buttonText = "Upload File",
  allowedFileTypes = [],
  maxFileSize = 5, // in MB
}) => {
  const [isFocused, setIsFocused] = useState(!!value);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  const handleFileClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const validateFile = (file) => {
    // Check file type if allowedFileTypes array is provided
    if (allowedFileTypes.length > 0) {
      const fileType = file.type.split("/")[1];
      if (!allowedFileTypes.includes(fileType)) {
        return `File type not allowed. Allowed types: ${allowedFileTypes.join(
          ", "
        )}`;
      }
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxFileSize) {
      return `File is too large. Maximum size allowed is ${maxFileSize}MB`;
    }

    return "";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setFileError(validationError);
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      setFileError("");

      // Create a custom event object to match your existing onChange structure
      const customEvent = {
        target: {
          value: file,
        },
      };

      onChange(customEvent, keyValue, "file");
      setIsFocused(true);
    }
  };

  const getFileName = () => {
    if (!value) return "";

    if (typeof value === "string") {
      // If value is a string (like a filename or URL)
      return value.split("/").pop();
    } else if (value instanceof File) {
      // If value is a File object
      return value.name;
    }
    return "";
  };

  const baseClasses = `block w-full px-3 py-[14px] text-[14px] shadow-sm rounded border-[1px] focus:outline-none ${
    error || fileError ? "border-red-500" : "border-[#DADBE5]"
  } text-[#231F20] ${
    disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"
  } ${className}`;

  return (
    <div className="relative w-full">
      <FloatingPlaceholder
        className={`${labelClassName}`}
        isFocused={isFocused}
        hasError={!!(error || fileError)}
      >
        <span
          style={{ fontSize: isFocused ? "11px" : "13px" }}
          className={`${labelClassName} ${
            error || fileError ? "text-red-500" : "text-[#808082]"
          } }`}
        >
          {label}
          {mandatory ? "*" : ""}
        </span>
      </FloatingPlaceholder>

      <div
        className={baseClasses}
        onClick={handleFileClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
      >
        <div className="flex items-center justify-between">
          <span className={`truncate ${!getFileName() ? "text-gray-400" : ""}`}>
            {getFileName() || ""}
          </span>
          <button
            type="button"
            className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
              disabled
                ? "bg-gray-200 text-gray-500"
                : "bg-[#130061]  text-white hover:bg-[#352d57]"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) fileInputRef.current?.click();
            }}
            disabled={disabled}
          >
            {buttonText}
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        id={id}
        type="file"
        name={name}
        onChange={handleFileChange}
        className="hidden"
        accept={accept}
        disabled={disabled}
      />

      {(error || fileError) && (
        <p className="mt-1 text-xs text-red-500">{error || fileError}</p>
      )}
    </div>
  );
};

export default FloatingFileUpload;
