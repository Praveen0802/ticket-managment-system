import React, { useState } from "react";

const NotificationActivityList = () => {
  const heading = [
    { name: "Notifications", key: "notifications" },
    { name: "Activity", key: "activity" },
  ];

  const displayedValues = [
    {
      name: "Golden Circle for WIZ KHALIFA on 16 November 2024 at 20:00 has successfully been updated",
      time: "Thu, 01 Feb 2024, 18:00",
    },
    {
      name: "Golden Circle for WIZ KHALIFA on 16 November 2024 at 20:00 has successfully been updated",
      time: "Thu, 01 Feb 2024, 18:00",
    },
    {
      name: "Golden Circle for WIZ KHALIFA on 16 November 2024 at 20:00 has successfully been updated",
      time: "Thu, 01 Feb 2024, 18:00",
    },
    {
      name: "Golden Circle for WIZ KHALIFA on 16 November 2024 at 20:00 has successfully been updated",
      time: "Thu, 01 Feb 2024, 18:00",
    },
    {
      name: "Golden Circle for WIZ KHALIFA on 16 November 2024 at 20:00 has successfully been updated",
      time: "Thu, 01 Feb 2024, 18:00",
    },
    {
      name: "Golden Circle for WIZ KHALIFA on 16 November 2024 at 20:00 has successfully been updated",
      time: "Thu, 01 Feb 2024, 18:00",
    },
    {
      name: "Golden Circle for WIZ KHALIFA on 16 November 2024 at 20:00 has successfully been updated",
      time: "Thu, 01 Feb 2024, 18:00",
    },
    {
      name: "Golden Circle for WIZ KHALIFA on 16 November 2024 at 20:00 has successfully been updated",
      time: "Thu, 01 Feb 2024, 18:00",
    },
    {
      name: "Golden Circle for WIZ KHALIFA on 16 November 2024 at 20:00 has successfully been updated",
      time: "Thu, 01 Feb 2024, 18:00",
    },
    {
      name: "Golden Circle for WIZ KHALIFA on 16 November 2024 at 20:00 has successfully been updated",
      time: "Thu, 01 Feb 2024, 18:00",
    },
  ];

  const [activeTab, setActiveTab] = useState("notifications");
  return (
    <div className="border-[1px] border-[#eaeaf1] rounded-md bg-white">
      <div className="flex gap-4 sm:gap-[30px] items-center px-4 pt-4 border-b-[1px] border-[#eaeaf1]">
        {heading.map((item, index) => (
          <p
            key={index}
            onClick={() => {
              setActiveTab(item.key);
            }}
            className={`${
              item?.key == activeTab
                ? "text-[#343432] font-semibold border-b-[1px] border-[#0137D5]"
                : "text-[#7D82A4] font-normal"
            } text-[14px] sm:text-[16px] pb-4 cursor-pointer`}
          >
            {item.name}
          </p>
        ))}
      </div>
      <div className="max-h-[300px] overflow-auto">
        {displayedValues.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-[10px] border-b-[1px] border-[#F0F0F5]"
          >
            <p className="text-[#343432] text-[13px] font-normal mb-1 sm:mb-0 sm:mr-2 sm:flex-1">
              {item?.name}
            </p>
            <p className="text-[#03BA8A] text-[13px] font-normal whitespace-nowrap">
              {item?.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationActivityList;
