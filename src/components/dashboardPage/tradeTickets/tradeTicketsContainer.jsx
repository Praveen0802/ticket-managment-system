import React from "react";

const TradeTicketsContainer = ({ tracking, className }) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center justify-between p-4 border-b-[1px] border-[#F0F0F5] `}
      >
        <div className="text-[13px] flex gap-1 text-[#323A70] font-semibold">
          {tracking?.title}
          <span className="bg-[#0137D5] text-[10px] text-white px-[6px] py-[2px] rounded-full">
            {tracking?.count}
          </span>
        </div>
        <p className="text-[#7D82A4] text-[13px] font-normal">
          {tracking?.subHeading}
        </p>
      </div>
      <div className="flex flex-col overflow-auto max-h-[180px]">
        {tracking?.listItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-2 border-b-[1px] border-[#F0F0F5]"
          >
            <p className="text-[#323A70] text-[13px] font-normal">
              {item?.title}
            </p>
            <p className="text-[#323A70] text-[13px] font-normal">
              {item?.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeTicketsContainer;
