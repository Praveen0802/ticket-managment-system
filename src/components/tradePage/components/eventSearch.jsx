import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";

const EventSearch = ({ onClose }) => {
  return (
    <div className="bg-white w-[300px] h-full shadow-md">
      <div className="flex justify-between items-center border-b-[1px] border-[#E0E1EA] p-4">
        <p className="text-[#323A70] text-[18px] font-semibold">Event Search</p>
        <div className="flex gap-1 items-center">
          <button className="cursor-pointer">
            <IconStore.reload className="stroke-[#3E2E7E] size-3" />
          </button>
          <button className="cursor-pointer" onClick={onClose}>
            <IconStore.close className="stroke-[#3E2E7E] size-3" />
          </button>
        </div>
      </div>
      {/* Rest of your EventSearch content here */}
    </div>
  );
};

export default EventSearch;
