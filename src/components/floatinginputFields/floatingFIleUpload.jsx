import React, { useState, useRef } from "react";
import { IconStore } from "@/utils/helperFunctions/iconStore";

const FloatingFileUpload = ({
  id,
  name,
  keyValue,
  label,
  labelClassName,
  mandatory,
  disabled,
  className,
  value,
  onChange,
  accept,
  buttonText,
  allowedFileTypes,
  maxFileSize,
  error,
}) => {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    if (allowedFileTypes && allowedFileTypes.length > 0) {
      const fileExt = file.name.split(".").pop().toLowerCase();
      if (!allowedFileTypes.includes(fileExt)) {
        setFileError(
          `Invalid file type. Allowed types: ${allowedFileTypes.join(", ")}`
        );
        return;
      }
    }

    // Validate file size
    if (maxFileSize && file.size > maxFileSize * 1024 * 1024) {
      setFileError(`File size exceeds ${maxFileSize}MB limit`);
      return;
    }

    setFileName(file.name);
    setFileSize(file.size);
    setFileError("");

    // Create a synthetic event with target.value set to the file
    const syntheticEvent = {
      target: {
        value: file,
      },
    };

    onChange(syntheticEvent, keyValue, "file");
  };

  const handleButtonClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const removeFile = () => {
    setFileName("");
    setFileSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Create a synthetic event with empty value
    const syntheticEvent = {
      target: {
        value: "",
      },
    };

    onChange(syntheticEvent, keyValue, "file");
  };

  return (
    <div className="w-full mb-4">
      <label
        htmlFor={id}
        className={`block ${
          labelClassName || "text-sm font-medium text-gray-700"
        }`}
      >
        {label}
        {mandatory && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type="file"
        id={id}
        name={name}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
        disabled={disabled}
      />

      <div className={`mt-1 flex flex-col ${className || ""}`}>
        {!fileName ? (
          <div
            onClick={handleButtonClick}
            className={`w-full flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer ${
              disabled ? "bg-gray-100 cursor-not-allowed" : "hover:bg-gray-50"
            }`}
          >
            <div className="space-y-1 text-center">
              <div className="flex justify-center">
                <IconStore.upload className="size-6 text-gray-400" />
              </div>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor={id}
                  className={`relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span>{buttonText || "Upload a file"}</span>
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                {allowedFileTypes
                  ? `${allowedFileTypes
                      .join(", ")
                      .toUpperCase()} up to ${maxFileSize}MB`
                  : `File up to ${maxFileSize}MB`}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-md bg-gray-50">
            <div className="flex items-center space-x-2">
              <IconStore.document className="size-6 text-indigo-600" />
              <div className="text-sm">
                <p className="font-medium text-gray-900 truncate max-w-xs">
                  {fileName}
                </p>
                <p className="text-gray-500">{formatFileSize(fileSize)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <IconStore.close className="h-4 w-4" />
            </button>
          </div>
        )}

        {(error || fileError) && (
          <p className="mt-1 text-sm text-red-600">{error || fileError}</p>
        )}
      </div>
    </div>
  );
};

export default FloatingFileUpload;
