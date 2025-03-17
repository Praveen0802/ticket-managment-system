import React from "react";

const AvailableCard = ({ listItem }) => {
  const {
    title = "",
    icon = "",
    amount = "",
    ctaValues = [],
    note1 = "",
    note = "",
    accountDetails = [],
  } = listItem;
  return (
    <div className="p-4 border-[1px] flex flex-col justify-between border-[#E0E1EA] rounded-md">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-[20px] text-[#323A70] font-medium">{title}</p>
          {icon && icon}
        </div>
        <p className="text-[24px] text-[#323A70] font-medium">{amount}</p>
      </div>
      {ctaValues?.length > 0 && (
        <div className="flex bg-gray-200 mt-4 gap-3 rounded-md w-fit">
          {ctaValues?.map((item, index) => {
            return (
              <div
                className=" flex flex-col cursor-pointer items-center justify-center gap-1 p-2"
                key={index}
              >
                {item?.icon}
                <p className="text-[12px] text-[#323A70] font-medium ">
                  {item?.name}
                </p>
              </div>
            );
          })}
        </div>
      )}
      <div>
        {note1 && (
          <p className="text-[14px] text-[#323A70] font-medium ">{note1}</p>
        )}
        {note && (
          <p className="text-[12px] text-gray-500 font-normal ">{note}</p>
        )}
        {accountDetails?.length > 0 && (
          <div className="flex flex-col gap-3 max-h-[130px] overflow-auto">
            {accountDetails?.map((item, index) => {
              return (
                <div key={index}>
                  <p className="text-[13px] text-gray-500 font-normal ">
                    {item?.name}
                  </p>
                  <p className="text-[13px] text-[#323A70] font-medium ">
                    {item?.value}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableCard;
