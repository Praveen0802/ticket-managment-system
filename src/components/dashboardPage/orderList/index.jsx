import React from "react";

const OrderList = ({ title, desc }) => {
  return (
    <div className="p-3 md:px-2 md:py-4 border border-[#eaeaf1] flex flex-col gap-3 rounded-md">
      <p className="text-[#323A70] text-xs md:text-sm">{title}</p>
      <p className="text-[#323A70] text-sm md:text-base font-semibold">
        {desc}
      </p>
    </div>
  );
};

export default OrderList;
