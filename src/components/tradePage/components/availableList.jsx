import React from "react";

const AvailableList = ({ list }) => {
  return (
    <div className="border-[1px] border-[#E0E1EA] rounded-[6px] bg-white py-[12px] px-4 w-full flex flex-col gap-[6px]">
      <p className="text-[24px] text-[#323A70]">{list?.value}</p>
      <p className="text-[12px] text-[#7D82A4] font-normal">{list?.name}</p>
    </div>
  );
};

export default AvailableList;
