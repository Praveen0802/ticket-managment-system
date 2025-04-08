import React, { useState } from "react";
import AvailableList from "../components/availableList";
import FloatingSelect from "@/components/floatinginputFields/floatingSelect";
import FloatingDateRange from "@/components/commonComponents/dateRangeInput";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import StickyDataTable from "../components/stickyDataTable";

const PurchaseFolder = () => {
  const [selectedMatch, setSelectedMatch] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [orderDate, setOrderDate] = useState("");

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
    {
      icon: <IconStore.eye className="size-5" />,
      className: " cursor-pointer",
    },
  ];

  const listItems = [
    { name: "Purchases", value: 1 },
    { name: "Upcomming Event", value: 0 },
    { name: "Past Events", value: 0 },
    { name: "Details Required", value: 0 },
  ];

  const handleSelectChange = (e, key, type) => {
    const value = e;
    setSelectedMatch(value);
  };

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="bg-white">
        <div className="px-[24px] py-[20px] border-b-[1px] border-[#E0E1EA]">
          <div className=" flex gap-4">
            {listItems?.map((item, index) => {
              return <AvailableList key={index} list={item} />;
            })}
          </div>
        </div>
        <div className="px-[24px] py-[20px] border-b-[1px] border-[#E0E1EA]">
          <div className="flex gap-4 items-center w-[70%]">
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
              className="!w-[60%]"
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
              value={eventDate}
              singleDateMode={true}
              onChange={(dateValue) => setEventDate(dateValue)}
            />
            <FloatingDateRange
              id="orderDate"
              name="orderDate"
              keyValue="orderDate"
              parentClassName="!w-fit"
              label="Order Date"
              className="!py-[8px] !px-[16px] mobile:text-xs"
              value={orderDate}
              singleDateMode={true}
              onChange={(dateValue) => setOrderDate(dateValue)}
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

export default PurchaseFolder;
