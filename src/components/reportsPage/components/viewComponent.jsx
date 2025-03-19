import Image from "next/image";
import React from "react";
import plus from "../../../../public/plus.svg";
import { IconStore } from "@/utils/helperFunctions/iconStore";

const ViewComponent = ({ item }) => {
  const keyValues = [
    { key: "On Hold", value: item?.keys?.onHold, hold: true },
    { key: "Pending Delivery", value: item?.keys?.pendingDelivery },
    { key: "Pending Payout", value: item?.keys?.pendingPayment },
    { key: "Total Revenue", value: item?.keys?.total },
  ];
  return (
    <div className="p-4 border-[1px] border-[#eaeaf1] rounded-md flex flex-col gap-2">
      <div className="flex justify-between items-center pb-4 border-b-[1px] border-[#eaeaf1]">
        <div className="flex gap-2 items-center">
          <Image src={item?.icon} width={40} height={40} alt="logo" />
          <div className="flex flex-col">
            <p className="text-[20px] font-semibold">{item?.amount}</p>
            <p className="text-[#6A7097] text-[12px] font-normal">
              {item?.balance}
            </p>
          </div>
        </div>
        <div className="p-[8px] cursor-pointer rounded-md bg-[#F2F5FD]">
          <Image src={plus} width={18} height={18} alt="plus" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {keyValues?.map((item, index) => {
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <p className={`text-[#6A7097] text-[12px] font-normal`}>
                  {item?.key}
                </p>
                <IconStore.exclamatory className="size-4 stroke-[#6A7097]" />
              </div>
              <p
                className={`${
                  item?.hold ? "text-[#E93042]" : "text-[#323A70]"
                } text-[12px] font-semibold`}
              >
                {item?.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewComponent;
