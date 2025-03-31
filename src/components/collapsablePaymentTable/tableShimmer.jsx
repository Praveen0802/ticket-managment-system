import React from "react";

const TableShimmer = ({ rowCount = 5, columnCount = 6 }) => {
  return (
    <div className="w-full flex flex-col gap-4 mobile:gap-2 animate-pulse">
      {/* Section Header Shimmer */}
      <div className="mb-1 overflow-hidden">
        <div className="rounded-[6px] bg-gray-300 h-12 mobile:h-10"></div>
      </div>
      
      {/* Table Shimmer */}
      <div className="w-full border border-[#E0E1EA] rounded-[6px] overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-100 p-3 mobile:p-2">
          <div className="flex">
            {Array(columnCount).fill(0).map((_, idx) => (
              <div key={idx} className="flex-1 h-4 bg-gray-300 rounded mr-2"></div>
            ))}
          </div>
        </div>
        
        {/* Table Rows */}
        {Array(rowCount).fill(0).map((_, rowIndex) => (
          <div key={rowIndex} className="border-t border-[#E0E1EA]">
            <div className="flex p-3 mobile:p-2">
              {Array(columnCount).fill(0).map((_, cellIndex) => (
                <div key={cellIndex} className="flex-1 h-4 bg-gray-200 rounded mr-2"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableShimmer;