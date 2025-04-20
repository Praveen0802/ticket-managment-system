import { IconStore } from "@/utils/helperFunctions/iconStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import blueCalendar from "../../../../public/blue-calendar-icon.svg";
import useIsMobile from "@/utils/helperFunctions/useIsmobile";

const EventListView = ({ event, onClick }) => {
  const isMobile = useIsMobile()

  // Mobile version
  if (isMobile) {
    return (
      <div 
        onClick={onClick} 
        className="border-b border-[#E0E1EA] p-3 cursor-pointer hover:bg-[#F6F7F9] transition-colors duration-200"
      >
        {/* Event name, league and date in header */}
        <div className="mb-2">
          <p className="text-[#7D82A4] text-xs font-normal">{event?.league}</p>
          <p className="text-base text-[#323A70] font-normal">{event?.name}</p>
        </div>
        
        {/* Date and time */}
        <div className="flex items-center mb-3">
          <div className="flex items-center gap-1 mr-4">
            <Image src={blueCalendar} width={14} height={14} alt="logo" />
            <p className="text-[#323A70] text-sm font-normal">{event?.date}</p>
          </div>
          <div className="flex items-center gap-1">
            <IconStore.clock className="size-4 text-[#333B70]" />
            <p className="text-[#323A70] text-sm font-normal">{event?.time}</p>
          </div>
        </div>
        
        {/* Event stats in grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#F6F7F9] p-2 text-center rounded">
            <p className="text-xs text-[#7D82A4]">Listing</p>
            <p className="text-sm text-[#323A70] font-medium">{event?.listing}</p>
          </div>
          <div className="bg-[#F6F7F9] p-2 text-center rounded">
            <p className="text-xs text-[#7D82A4]">Available</p>
            <p className="text-sm text-[#323A70] font-medium">{event?.availableTickets}</p>
          </div>
          <div className="bg-[#F6F7F9] p-2 text-center rounded">
            <p className="text-xs text-[#7D82A4]">From</p>
            <p className="text-sm text-[#323A70] font-medium">{event?.priceFrom}</p>
          </div>
        </div>
      </div>
    );
  }

  // Desktop version - unchanged
  return (
    <div onClick={onClick} className="flex items-center cursor-pointer hover:bg-[#F6F7F9] transition-colors duration-200 justify-around w-full border-b border-[#E0E1EA]">
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