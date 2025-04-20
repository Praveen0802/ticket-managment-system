import React from "react";
import AddressList from "./addressList";

const AddressView = ({
  title,
  handleEditClick,
  handleDeleteClick,
  addressValues,
  component,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium md:text-base">{title}</p>
        {component && component}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {addressValues?.map((item, index) => {
          return (
            <AddressList
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              item={item}
              index={index}
              key={index}
            />
          );
        })}
      </div>
    </>
  );
};

export default AddressView;
