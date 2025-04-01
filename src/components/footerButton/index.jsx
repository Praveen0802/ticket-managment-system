import React from "react";
import Button from "../commonComponents/button";

const FooterButton = ({ isFormValid, onClose, handleSubmit, loader }) => {
  return (
    <div className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-gray-200 rounded-b-lg flex justify-end gap-3 sm:gap-4 mt-auto">
      <Button
        label="Cancel"
        type="secondary"
        onClick={onClose}
        classNames={{
          root: "py-2 px-3 sm:px-4 bg-white hover:bg-gray-50 rounded-md transition-all duration-200",
          label_: "text-sm font-medium text-gray-800",
        }}
      />
      <Button
        label="Submit"
        disabled={!isFormValid()}
        loading={loader}
        onClick={handleSubmit}
        classNames={{
          root: `py-2 px-4 sm:px-5 rounded-md transition-all duration-200 ${
            isFormValid()
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          }`,
          label_: "text-sm font-medium text-white",
        }}
      />
    </div>
  );
};

export default FooterButton;
