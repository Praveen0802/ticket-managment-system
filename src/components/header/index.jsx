import React from "react";
import Button from "../commonComponents/button";
import botIcon from "../../../public/bot.svg";
import Image from "next/image";

const Header = () => {
  // Function to get the appropriate greeting based on the current time
  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };

  return (
    <div className="px-4 sm:px-[24px] h-auto min-h-[60px] sm:h-[80px] py-3 sm:py-0 bg-white border-b-[1px] flex flex-col sm:flex-row w-full justify-between items-start sm:items-center border-[#eaeaf1] gap-3 sm:gap-0">
      <p className="text-[18px] sm:text-[24px] font-semibold text-[#323A70]">
        {getGreeting()}, Ahmad
      </p>
      <div className="flex gap-3 items-center self-end sm:self-auto">
        <Button
          type="secondary"
          label={"Request Event"}
          classNames={{
            root: "border-[1px] border-[#0137D5] py-[8px] sm:py-[11px] px-[10px] sm:px-[14px]",
            label_: "text-[12px] sm:text-[14px] font-medium",
          }}
        />
        <Image
          src={botIcon}
          width={36}
          height={36}
          alt="boticon"
          className="w-9 h-9 sm:w-12 sm:h-12"
        />
      </div>
    </div>
  );
};

export default Header;
