import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState } from "react";
import blueLocation from "../../../../public/blue-location.svg";
import Image from "next/image";
import blueCalendar from "../../../../public/blue-calendar.svg";
import blueClock from "../../../../public/blue-clock.svg";
import ToggleStatus from "./components/toggleStatus";

const InventoryFolder = () => {
  const [selectedItem, setSelectedItem] = useState("all");
  const selectedMatchData = {
    match: "Chelsea vs Arsenal - Premier League",
    eventDate: "Sun, 10 Nov 2024",
    eventTime: "15:00",
    Venue: "Stamford Bridge, London",
  };

  const renderListValue = (icon, text) => {
    return (
      <div className="flex gap-[8px] items-center">
        {icon}
        <p className="text-[14px] font-normal text-[#323A70]">{text}</p>
      </div>
    );
  };

  const listItems = [
    {
      key: "all",
      label: "All Listings",
    },
    {
      key: "mine",
      label: "My Listings",
    },
  ];

  const handleSelectedItemClick = (item) => {
    setSelectedItem(item?.key);
  };

  return (
    <div>
      <div className="bg-white">
        <div className="px-[24px] border-b-[1px] border-[#E0E1EA] flex gap-4 items-center">
          <p className="py-[20px] pr-[20px] text-[14px] font-medium text-[#323A70] border-r-[1px] border-[#E0E1EA]">
            {selectedMatchData?.match}
          </p>
          <div className="py-[20px] flex gap-4 items-center">
            <div className="pr-[20px] border-r-[1px] border-[#E0E1EA]">
              {renderListValue(
                <Image
                  src={blueCalendar}
                  alt="location"
                  width={18}
                  height={18}
                />,
                selectedMatchData?.eventDate
              )}
            </div>
            <div className="pr-[20px] border-r-[1px] border-[#E0E1EA]">
              {renderListValue(
                <Image src={blueClock} alt="location" width={18} height={18} />,

                selectedMatchData?.eventTime
              )}
            </div>
            {renderListValue(
              <Image
                src={blueLocation}
                alt="location"
                width={18}
                height={18}
              />,

              selectedMatchData?.Venue
            )}
          </div>
        </div>
        <div className="px-[24px] py-[20px] border-b-[1px] border-[#E0E1EA]">
          <div className="w-[250px]">
            <ToggleStatus
              listItems={listItems}
              selectedItem={selectedItem}
              onClick={handleSelectedItemClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryFolder;
