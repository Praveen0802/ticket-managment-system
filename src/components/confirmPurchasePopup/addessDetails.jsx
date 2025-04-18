import React from "react";

const AddressDetails = ({
  addressDetails,
  selectedAddress,
  handleAddressChange,
}) => {
  return (
    <div className="border border-gray-200 rounded-md">
      <p className="px-4 py-2 border-b border-gray-200 text-[14px] font-medium">
        Buying From
      </p>
      <div>
        {addressDetails?.map((field, index) => {
          if (!field?.address_type || !field?.address_line1) return null;

          return (
            <label
              key={index}
              className={`flex items-center justify-between px-4 py-2 cursor-pointer ${
                index !== addressDetails?.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="addressSelection" // Changed from paymentMethod to addressSelection
                  className="w-3 h-3 text-blue-600 cursor-pointer"
                  checked={selectedAddress === index}
                  onChange={() => handleAddressChange(index)}
                />
                <div className="ml-3 flex items-center">
                  <p className="text-gray-700 text-[13px] font-medium">
                    {field?.address_type} - {field?.address_line1}
                  </p>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default AddressDetails;
