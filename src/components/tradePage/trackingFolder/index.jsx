import React, { useState } from "react";
import StickyDataTable from "../components/stickyDataTable";
import AvailableList from "../components/availableList";
import FloatingLabelInput from "@/components/floatinginputFields";
import attachSquare from "../../../../public/attach-square.svg";
import oneHand from "../../../../public/One-hand.svg";
import star from "../../../../public/Star.svg";
import documentText from "../../../../public/document-text.svg";
import Image from "next/image";
import FloatingSelect from "@/components/floatinginputFields/floatingSelect";
import FloatingDateRange from "@/components/commonComponents/dateRangeInput";
import Button from "@/components/commonComponents/button";

const TrackingPage = () => {
  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const headers = [
    { key: "status", label: "Status", sortable: true },
    { key: "event", label: "Event", sortable: true },
    { key: "venue", label: "Venue", sortable: true },
    { key: "eventDate", label: "Event Date", sortable: true },
    { key: "ticketDetails1", label: "Ticket Details", sortable: true },
    { key: "ticketDetails2", label: "Ticket Details", sortable: true },
    { key: "ticketType", label: "Ticket Type", sortable: true },
    { key: "qty", label: "Qty", sortable: true },
    { key: "ticketPrice", label: "Ticket Price", sortable: true },
  ];

  const data = [
    {
      status: "Available",
      event: "UFC 308 - Ilia Topuria vs ...",
      venue: "Etihad Arena, Abu Dhabi",
      eventDate: "01/02/2024 18:00",
      ticketDetails1: "Shortside Upper Tier",
      ticketDetails2: "Shortside Upper AU1",
      ticketType: "External Transfer",
      qty: "2",
      ticketPrice: "£318.27",
    },
    {
      status: "Fulfilled",
      event: "UFC 308 - Ilia Topuria vs ...",
      venue: "Etihad Arena, Abu Dhabi",
      eventDate: "01/02/2024 18:00",
      ticketDetails1: "Shortside Upper Tier",
      ticketDetails2: "Shortside Upper AU1",
      ticketType: "External Transfer",
      qty: "2",
      ticketPrice: "£318.27",
    },
    {
      status: "Fulfilled",
      event: "UFC 308 - Ilia Topuria vs ...",
      venue: "Etihad Arena, Abu Dhabi",
      eventDate: "01/02/2024 18:00",
      ticketDetails1: "Shortside Upper Tier",
      ticketDetails2: "Shortside Upper AU1",
      ticketType: "External Transfer",
      qty: "2",
      ticketPrice: "£318.27",
    },
    {
      status: "Fulfilled",
      event: "UFC 308 - Ilia Topuria vs ...",
      venue: "Etihad Arena, Abu Dhabi",
      eventDate: "01/02/2024 18:00",
      ticketDetails1: "Shortside Upper Tier",
      ticketDetails2: "Shortside Upper AU1",
      ticketType: "External Transfer",
      qty: "2",
      ticketPrice: "£318.27",
    },
    {
      status: "Fulfilled",
      event: "UFC 308 - Ilia Topuria vs ...",
      venue: "Etihad Arena, Abu Dhabi",
      eventDate: "01/02/2024 18:00",
      ticketDetails1: "Shortside Upper Tier",
      ticketDetails2: "Shortside Upper AU1",
      ticketType: "External Transfer",
      qty: "2",
      ticketPrice: "£318.27",
    },
  ];

  const rightStickyColumns = [
    [
      {
        icon: <Image width={20} height={20} src={attachSquare} alt="attach" />,
        className: "cursor-pointer",
        key: "attach",
      },
      {
        icon: <Image width={20} height={20} src={oneHand} alt="hand" />,
        className: "cursor-pointer",
        key: "oneHand",
      },
      {
        icon: <Image width={20} height={20} src={star} alt="star" />,
        className: "border-x-[1px] border-[#E0E1EA] cursor-pointer",
        key: "star",
      },
      {
        icon: (
          <Image width={20} height={20} src={documentText} alt="document" />
        ),
        className: "cursor-pointer",
        key: "document",
      },
      {
        icon: (
          <Button
            label="Buy"
            classNames={{
              label_: "text-white text-xs sm:text-sm",
              root: "bg-[#0137D5] py-1 px-2 rounded-md hover:bg-[#0137D5] transition-colors whitespace-nowrap",
            }}
          />
        ),
        key: "buy",
      },
    ],
    [
      {
        icon: <Image width={20} height={20} src={attachSquare} alt="attach" />,
        className: "cursor-pointer",
        key: "attach",
      },
      {
        icon: <Image width={20} height={20} src={oneHand} alt="hand" />,
        className: "cursor-pointer",
        key: "oneHand",
      },
      {
        icon: <Image width={20} height={20} src={star} alt="star" />,
        className: "border-x-[1px] border-[#E0E1EA] cursor-pointer",
        key: "star",
      },
      {
        icon: (
          <Image width={20} height={20} src={documentText} alt="document" />
        ),
        className: "cursor-pointer",
        key: "document",
      },
      {
        icon: (
          <Button
            label="Buy"
            classNames={{
              label_: "text-white text-xs sm:text-sm",
              root: "bg-[#0137D5] py-1 px-2 rounded-md hover:bg-[#0137D5] transition-colors whitespace-nowrap",
            }}
          />
        ),
        key: "buy",
      },
    ],
    [
      {
        icon: <Image width={20} height={20} src={attachSquare} alt="attach" />,
        className: "cursor-pointer",
        key: "attach",
      },
      {
        icon: <Image width={20} height={20} src={oneHand} alt="hand" />,
        className: "cursor-pointer",
        key: "oneHand",
      },
      {
        icon: <Image width={20} height={20} src={star} alt="star" />,
        className: "border-x-[1px] border-[#E0E1EA] cursor-pointer",
        key: "star",
      },
      {
        icon: (
          <Image width={20} height={20} src={documentText} alt="document" />
        ),
        className: "cursor-pointer",
        key: "document",
      },
      {
        icon: (
          <Button
            label="Buy"
            classNames={{
              label_: "text-white text-xs sm:text-sm",
              root: "bg-[#0137D5] py-1 px-2 rounded-md hover:bg-[#0137D5] transition-colors whitespace-nowrap",
            }}
          />
        ),
        key: "buy",
      },
    ],
    [
      {
        icon: <Image width={20} height={20} src={attachSquare} alt="attach" />,
        className: "cursor-pointer",
        key: "attach",
      },
      {
        icon: <Image width={20} height={20} src={oneHand} alt="hand" />,
        className: "cursor-pointer",
        key: "oneHand",
      },
      {
        icon: <Image width={20} height={20} src={star} alt="star" />,
        className: "border-x-[1px] border-[#E0E1EA] cursor-pointer",
        key: "star",
      },
      {
        icon: (
          <Image width={20} height={20} src={documentText} alt="document" />
        ),
        className: "cursor-pointer",
        key: "document",
      },
      {
        icon: (
          <Button
            label="Buy"
            classNames={{
              label_: "text-white text-xs sm:text-sm",
              root: "bg-[#0137D5] py-1 px-2 rounded-md hover:bg-[#0137D5] transition-colors whitespace-nowrap",
            }}
          />
        ),
        key: "buy",
      },
    ],
    [
      {
        icon: <Image width={20} height={20} src={attachSquare} alt="attach" />,
        className: "cursor-pointer",
        key: "attach",
      },
      {
        icon: <Image width={20} height={20} src={oneHand} alt="hand" />,
        className: "cursor-pointer",
        key: "oneHand",
      },
      {
        icon: <Image width={20} height={20} src={star} alt="star" />,
        className: "border-x-[1px] border-[#E0E1EA] cursor-pointer",
        key: "star",
      },
      {
        icon: (
          <Image width={20} height={20} src={documentText} alt="document" />
        ),
        className: "cursor-pointer",
        key: "document",
      },
      {
        icon: (
          <Button
            label="Buy"
            classNames={{
              label_: "text-white text-xs sm:text-sm",
              root: "bg-[#0137D5] py-1 px-2 rounded-md hover:bg-[#0137D5] transition-colors whitespace-nowrap",
            }}
          />
        ),
        key: "buy",
      },
    ],
  ];

  const [items, setItems] = useState([
    { name: "Tracking", value: 1, showCheckbox: false },
    { name: "Available", value: 0, showCheckbox: true, isChecked: false },
    { name: "Sold", value: 0, showCheckbox: true, isChecked: false },
  ]);

  // Toggle checkbox for specific item
  const toggleItem = (index) => {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleSelectChange = (e, key, type) => {
    const value = e;
    setSelectedMatch(value);
  };

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="bg-white">
        <div className="py-[20px] px-[24px] border-b-[1px] border-[#E0E1EA]">
          <div className=" flex gap-4 w-[70%]">
            {items.map((item, index) => (
              <AvailableList
                key={index}
                list={{
                  name: item.name,
                  value: item.value,
                  showCheckbox: item.showCheckbox,
                  isChecked: item.isChecked,
                  onCheckChange: () => toggleItem(index),
                  onClick: item.showCheckbox
                    ? () => toggleItem(index)
                    : undefined,
                }}
              />
            ))}
          </div>
        </div>
        <div className="py-[20px] px-[24px] border-b-[1px] border-[#E0E1EA]">
          <div className="flex gap-4 items-center w-[50%]">
            <FloatingSelect
              label={"Choose Match Event"}
              options={[
                { value: "1", label: "Approved" },
                { value: "2", label: "Pending" },
                { value: "3", label: "Rejected" },
              ]}
              selectedValue={selectedMatch}
              keyValue="selectedMatch"
              selectedClassName="!text-[#323A70] text-[14px] font-medium"
              className="!w-[80%]"
              onSelect={handleSelectChange}
              paddingClassName="!py-[6px] !px-[12px] w-full mobile:text-xs"
            />
            <FloatingDateRange
              id="eventDate"
              name="eventDate"
              keyValue="eventDate"
              parentClassName="!w-fit"
              label="Event Date"
              className="!py-[8px] !px-[16px] mobile:text-xs"
              value={selectedDate}
              singleDateMode={true}
              onChange={(dateValue) => {
                setSelectedDate(dateValue);
              }}
            />
          </div>
        </div>
        <div className="border-b-[1px] border-[#E0E1EA]">
          <div
            className={
              "p-[20px] text-[14px] w-fit text-[#323A70] font-semibold border-r-[1px] border-[#E0E1EA]"
            }
          >
            {data?.length} purchases
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg mx-[24px]">
        <StickyDataTable
          headers={headers}
          data={data}
          rightStickyColumns={rightStickyColumns}
        />
      </div>
    </div>
  );
};

export default TrackingPage;
