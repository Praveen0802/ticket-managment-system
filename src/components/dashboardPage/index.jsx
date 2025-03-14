import React from "react";
import calendarIcon from "../../../public/calendar-03.svg";
import Image from "next/image";
import { formatDate } from "@/utils/helperFunctions";
import Button from "../commonComponents/button";
import Pound from "../../../public/dashboard-pound.svg";
import Currency from "../../../public/dashboard-currency.svg";
import Shopping from "../../../public/dashboard-shopping.svg";
import ViewContainer from "./viewContainer";

const DashboardPage = () => {
  const listValues = [
    {
      title: "Sales",
      options: [
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
      ],
      selectedOption: "today",
      onchange: () => {},
      listValues: [
        { image: Pound, text: "Sales", count: 0 },
        { image: Currency, text: "Tickets", count: 0 },
      ],
    },
    {
      title: "Awaiting Delivery",
      options: [
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
      ],
      selectedOption: "today",
      onchange: () => {},
      listValues: [
        { image: Pound, text: "Orders", count: 0 },
        { image: Shopping, text: "Tickets", count: 0 },
      ],
    },
  ];
  return (
    <div>
      <div className="bg-white flex items-center py-[8px] justify-between px-[24px] border-[1px] border-[#E0E1EA]">
        <div className="flex gap-2 items-center">
          <Image src={calendarIcon} width={16} height={16} alt="logo" />
          <p className="text-[#323A70] text-[14px]">{formatDate(new Date())}</p>
        </div>
        <Button
          type="blueType"
          classNames={{
            root: "px-[10px] py-[8px]",
            label_: "text-[14px] font-medium",
          }}
          label="Add Inventory"
        />
      </div>
      <div className="p-[24px] flex gap-[24px]">
        {listValues?.map((listItem, listIndex) => {
          return (
            <ViewContainer
              key={listIndex}
              title={listItem?.title}
              options={listItem?.options}
              listValues={listItem?.listValues}
              onChange={listItem?.onchange}
              selectedOption={listItem?.selectedOption}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
