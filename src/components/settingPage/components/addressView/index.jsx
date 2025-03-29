import React from "react";
import AddressList from "./addressList";

const AddressView = ({
  title,
  handleEditClick,
  addressValues,
}) => {
  return (
    <>
      <p className="text-sm font-medium md:text-base">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {addressValues?.map((item, index) => {
          return (
            <AddressList
              handleEditClick={handleEditClick}
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
