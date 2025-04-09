import Image from "next/image";
import React from "react";
import grayClock from "../../../../public/gray-clock.svg";
import grayLocation from "../../../../public/gray-location.svg";
import grayCalendar from "../../../../public/gray-calendar.svg";

const SearchedList = ({ item }) => {
  const renderIconText = (icon, text) => {
    return (
      <div className="flex gap-2 items-center">
        {icon}
        <p className="text-[#7D82A4] text-[12px] font-normal">{text}</p>
      </div>
    );
  };
  return (
    <div className="flex flex-col gap-2 p-4 border-[1px] border-[#E0E1EA]">
      <p className="text-[14px] text-[#323A70] font-semibold">{item?.name}</p>
      <div className="flex items-center gap-4">
        {renderIconText(
          <Image src={grayCalendar} width={16} height={16} alt="logo" />,
          item?.eventDate
        )}
        {renderIconText(
          <Image src={grayClock} width={16} height={16} alt="logo" />,
          item?.eventTime
        )}
      </div>
      {renderIconText(
        <Image src={grayLocation} width={16} height={16} alt="logo" />,
        item?.location
      )}
    </div>
  );
};

export default SearchedList;
