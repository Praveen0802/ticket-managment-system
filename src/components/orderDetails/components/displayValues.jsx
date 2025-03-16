import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";

const DisplayValues = ({
  text,
  pendingOrder,
  copyKeys,
  deliveryKey,
  value,
}) => {
  return (
    <div className="flex flex-col gap-[3px]">
      <p className={`text-[12px] font-normal text-[#7D82A4]  `}>{text}</p>
      <p
        className={`flex items-center justify-between ${
          copyKeys && "bg-[#F4F5F8] px-[4px] py-[2px] rounded-md"
        } ${
          pendingOrder &&
          "bg-[#F57B1B] text-white w-fit px-[2px] py-[1px] rounded-sm "
        } ${
          deliveryKey && "bg-[#FFF4EC] px-[4px] py-[2px] rounded-md w-fit"
        } text-[14px] font-normal text-[#323A70]`}
      >
        {value}
        {copyKeys && <IconStore.copy className="size-4 cursor-pointer" />}
      </p>
    </div>
  );
};

export default DisplayValues;
