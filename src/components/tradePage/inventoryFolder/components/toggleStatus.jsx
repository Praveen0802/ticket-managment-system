import React from "react";

const ToggleStatus = ({ listItems, selectedItem, onClick }) => {
  return (
    <div className="border-[1px] flex items-center border-[#E0E1EA] p-[3px] rounded-[8px] bg-white">
      {listItems?.map((item, index) => {
        return (
          <div
            onClick={() => onClick(item)}
            className={`w-[50%]  text-[14px] text-center py-[7px] cursor-pointer ${
              selectedItem == item?.key
                ? "text-white font-normal rounded-md bg-[#0137D5] "
                : ""
            }`}
            key={index}
          >
            {item?.label}
          </div>
        );
      })}
    </div>
  );
};

export default ToggleStatus;
