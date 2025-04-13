import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";

const EventListView = ({ event }) => {
  return (
    <div className=" flex justify-around items-center border-b-[1px] border-[#E0E1EA]">
      <div className="flex py-[22px] w-[30%] px-[10px] flex-col gap-[4px]">
        {/* <p className="text-[#7D82A4] text-[12px] font-normal">
          {event?.league}
        </p> */}
        <p
          title={event?.name}
          className="text-[16px] truncate text-[#323A70] font-normal"
        >
          {event?.name}
        </p>
      </div>
      <div className="flex py-[20px] w-[15%] whitespace-nowrap px-[12px] gap-1 items-center">
        <IconStore.calendar className="!size-4 text-[#333B70]" />
        <p className="text-[#323A70] text-[13px] font-normal">{event?.date}</p>
      </div>
      <div className="flex py-[20px] w-[10%] px-[12px] gap-1 items-center">
        <IconStore.clock className="!size-4 text-[#333B70]" />
        <p className="text-[#323A70] text-[13px] font-normal">{event?.time}</p>
      </div>
      <div className="bg-[#F6F7F9] w-[15%] py-[9px] px-[30px] m-4 md:w-[220px] text-center">
        <p className="text-[12px] text-[#7D82A4]">Listing</p>
        <p className="text-[16px] text-[#323A70]">{event?.listing}</p>
      </div>
      <div className="bg-[#F6F7F9] w-[15%] py-[9px] px-[30px] m-4 md:w-[220px] text-center">
        <p className="text-[12px] text-[#7D82A4]">Available Tickets</p>
        <p className="text-[16px] text-[#323A70]">{event?.availableTickets}</p>
      </div>
      <div className="bg-[#F6F7F9] w-[15%] py-[9px] px-[30px] m-4 md:w-[220px] text-center">
        <p className="text-[12px] text-[#7D82A4]">Price From</p>
        <p className="text-[16px] text-[#323A70]">{event?.priceFrom}</p>
      </div>
    </div>
  );
};

export default EventListView;
