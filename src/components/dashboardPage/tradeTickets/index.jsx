import Button from "@/components/commonComponents/button";
import React from "react";
import TradeTicketsContainer from "./tradeTicketsContainer";

const TradeTickets = () => {
  const tracking = {
    title: "Tracking",
    count: "1",
    subHeading: "price",
    listItems: [
      { title: "Milwaukee Bucks at New York Knicks", amount: "£3,955.00" },
      { title: "Milwaukee Bucks at New York Knicks", amount: "£3,955.00" },
    ],
  };

  const purchases = {
    title: "Purchases",
    count: "1",
    subHeading: "Event Date",
    listItems: [
      {
        title: "Al-Nassr FC vs Inter Miami CF",
        amount: "Thu, 01 Feb 2024, 18:00",
      },
      {
        title: "Al-Nassr FC vs Inter Miami CF",
        amount: "Thu, 01 Feb 2024, 18:00",
      },
      {
        title: "Al-Nassr FC vs Inter Miami CF",
        amount: "Thu, 01 Feb 2024, 18:00",
      },
      {
        title: "Al-Nassr FC vs Inter Miami CF",
        amount: "Thu, 01 Feb 2024, 18:00",
      },
      {
        title: "Al-Nassr FC vs Inter Miami CF",
        amount: "Thu, 01 Feb 2024, 18:00",
      },
      {
        title: "Al-Nassr FC vs Inter Miami CF",
        amount: "Thu, 01 Feb 2024, 18:00",
      },
    ],
  };

  return (
    <div className="border-[1px] border-[#eaeaf1] rounded-md bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b-[1px] border-[#eaeaf1]">
        <p className="text-[16px] text-[#343432] font-semibold mb-3 sm:mb-0">
          Trade Tickets
        </p>
        <Button type="blueType" label="Find Tickets" />
      </div>
      <div className="flex flex-col md:flex-row">
        <TradeTicketsContainer
          tracking={tracking}
          className="w-full md:w-[50%] border-b-[1px] md:border-b-0 md:border-r-[1px] border-[#eaeaf1]"
        />
        <TradeTicketsContainer
          tracking={purchases}
          className="w-full md:w-[50%]"
        />
      </div>
    </div>
  );
};

export default TradeTickets;
