import { IconStore } from "@/utils/helperFunctions/iconStore";
import React from "react";

const NonMatchSelectUI = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full flex flex-col items-center">
        <div className="mb-6">
          <IconStore.calendar className="w-16 h-16 text-[#0137D5]" />
        </div>

        <h2 className="text-xl font-semibold text-[#323A70] mb-3">
          No Match Selected
        </h2>

        <p className="text-[#64748B] text-center mb-6">
          Please select a match to view available inventory and ticket details.
        </p>
      </div>
    </div>
  );
};

export default NonMatchSelectUI;
