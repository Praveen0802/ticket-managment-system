import { IconStore } from "@/utils/helperFunctions/iconStore";
import Image from "next/image";
import React from "react";
import blueCalendar from "../../../../public/blue-calendar-icon.svg";

const EventListView = ({ event }) => {
  return (
    <div className="flex items-center justify-around w-full border-b border-[#E0E1EA]">
      {/* Event name and league */}
      <div className="flex-1 py-5 px-4 max-w-100">
        <p className="text-[#7D82A4] text-xs font-normal">{event?.league}</p>
        <p
          title={event?.name}
          className="text-base text-[#323A70] font-normal truncate"
        >
          {event?.name}
        </p>
      </div>

      {/* Date */}
      <div className="w-44 py-5 px-4 flex items-center gap-1">
        <Image src={blueCalendar} width={14} height={14} alt="logo" />
        <p className="text-[#323A70] text-sm font-normal">{event?.date}</p>
      </div>

      {/* Time */}
      <div className="w-24 py-5 px-4 flex items-center gap-1">
        <IconStore.clock className="size-4 text-[#333B70]" />
        <p className="text-[#323A70] text-sm font-normal">{event?.time}</p>
      </div>

      {/* Listing */}
      <div className="w-28 py-2 px-4 m-2 bg-[#F6F7F9] text-center">
        <p className="text-xs text-[#7D82A4]">Listing</p>
        <p className="text-base text-[#323A70]">{event?.listing}</p>
      </div>

      {/* Available Tickets */}
      <div className="w-36 py-2 px-4 m-2 bg-[#F6F7F9] text-center">
        <p className="text-xs text-[#7D82A4]">Available Tickets</p>
        <p className="text-base text-[#323A70]">{event?.availableTickets}</p>
      </div>

      {/* Price From */}
      <div className="w-36 py-2 px-4 m-2 bg-[#F6F7F9] text-center">
        <p className="text-xs text-[#7D82A4]">Price From</p>
        <p className="text-base text-[#323A70]">{event?.priceFrom}</p>
      </div>
    </div>
  );
};

export default EventListView;
