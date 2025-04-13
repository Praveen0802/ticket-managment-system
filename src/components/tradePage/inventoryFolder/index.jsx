import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState } from "react";
import blueLocation from "../../../../public/blue-location.svg";
import Image from "next/image";
import blueCalendar from "../../../../public/blue-calendar.svg";
import blueTicket from "../../../../public/blue-ticket.svg";
import hamburger from "../../../../public/hamburger.svg";
import blueClock from "../../../../public/blue-clock.svg";
import ToggleStatus from "./components/toggleStatus";
import attachSquare from "../../../../public/attach-square.svg";
import oneHand from "../../../../public/One-hand.svg";
import star from "../../../../public/Star.svg";
import InventoryFilterForm from "./inventoryFilterForm";
import Button from "@/components/commonComponents/button";
import documentText from "../../../../public/document-text.svg";
import StickyDataTable from "../components/stickyDataTable";
import PinPatchMap from "./pinPatchMap";

const InventoryFolder = () => {
  const [selectedItem, setSelectedItem] = useState("all");
  const [showMap, setShowMap] = useState(true);
  const [formFieldValues, setFormFieldValues] = useState({
    category: "",
    quantity: "",
    ticket_type: "",
    ticketsInHand: false,
    instantDownload: false,
    newListings: false,
  });
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
        <p className="text-[12px] font-normal text-[#323A70]">{text}</p>
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

  const handleChange = (e, key, type) => {
    const selectType = type === "select";
    const dateType = type == "date";
    const checkBoxType = type == "checkbox";
    const value = checkBoxType
      ? e.target.checked
      : selectType || dateType
      ? e
      : e.target.value;
    setFormFieldValues({ ...formFieldValues, [key]: value });
  };

  const renderListItem = (icon, text) => {
    return (
      <div className="flex gap-2 items-center">
        {icon && icon}
        <p className="text-[#323A70] text-[12px] font-normal">{text}</p>
      </div>
    );
  };

  const headers = [
    { key: "qty", label: "Qty", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "section", label: "Section/Block", sortable: true },
    { key: "row", label: "Row", sortable: true },
    { key: "forstSeat", label: "Forst Seat", sortable: true },
    { key: "ticketPrice", label: "Ticket Price", sortable: true },
  ];

  const data = [
    {
      qty: "1",
      category: "Terzo Anello Rosso",
      section: "",
      row: "N/A",
      forstSeat: "",
      ticketPrice: "£318.27",
    },
    {
      qty: "1",
      category: "Terzo Anello Rosso",
      section: "",
      row: "N/A",
      forstSeat: "",
      ticketPrice: "£318.27",
    },
    {
      qty: "1",
      category: "Terzo Anello Rosso",
      section: "",
      row: "N/A",
      forstSeat: "",
      ticketPrice: "£318.27",
    },
    {
      qty: "1",
      category: "Terzo Anello Rosso",
      section: "",
      row: "N/A",
      forstSeat: "",
      ticketPrice: "£318.27",
    },
    {
      qty: "1",
      category: "Terzo Anello Rosso",
      section: "",
      row: "N/A",
      forstSeat: "",
      ticketPrice: "£318.27",
    },
    {
      qty: "1",
      category: "Terzo Anello Rosso",
      section: "",
      row: "N/A",
      forstSeat: "",
      ticketPrice: "£318.27",
    },
    {
      qty: "1",
      category: "Terzo Anello Rosso",
      section: "",
      row: "N/A",
      forstSeat: "",
      ticketPrice: "£318.27",
    },
    {
      qty: "1",
      category: "Terzo Anello Rosso",
      section: "",
      row: "N/A",
      forstSeat: "",
      ticketPrice: "£318.27",
    },
    {
      qty: "1",
      category: "Terzo Anello Rosso",
      section: "",
      row: "N/A",
      forstSeat: "",
      ticketPrice: "£318.27",
    },
    {
      qty: "1",
      category: "Terzo Anello Rosso",
      section: "",
      row: "N/A",
      forstSeat: "",
      ticketPrice: "£318.27",
    },
  ];

  const rightStickyColumns = [
    {
      icon: <Image width={20} height={20} src={attachSquare} alt="attach" />,
      className: " cursor-pointer",
      key: "attach",   
    },
    {
      icon: <Image width={20} height={20} src={oneHand} alt="hand" />,
      className: " cursor-pointer",
      key: "oneHand",
    },
    {
      icon: <Image width={20} height={20} src={star} alt="star" />,
      className: "border-x-[1px] border-[#E0E1EA] cursor-pointer",
      key: "star",
    },
    {
      icon: <Image width={20} height={20} src={documentText} alt="document" />,
      className: "cursor-pointer",
      key: "document",
    },
    {
      icon: (
        <Button
          label="Buy"
          classNames={{
            label_: "text-white text-xs sm:text-sm",
            root: "bg-[#0137D5]  py-1 px-2 rounded-md  hover:bg-[#0137D5] transition-colors whitespace-nowrap",
          }}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 h-[calc(100%-100px)]">
      <div className="bg-white w-full">
        <div className="px-[30px] border-b-[1px] border-[#E0E1EA] flex gap-4 items-center">
          <p className="py-[12px] pr-[20px] text-[12px] font-medium text-[#323A70] border-r-[1px] border-[#E0E1EA]">
            {selectedMatchData?.match}
          </p>
          <div className="py-[10px] flex gap-4 items-center">
            <div className="pr-[20px] border-r-[1px] border-[#E0E1EA]">
              {renderListValue(
                <Image
                  src={blueCalendar}
                  alt="location"
                  width={14}
                  height={14}
                />,
                selectedMatchData?.eventDate
              )}
            </div>
            <div className="pr-[20px] border-r-[1px] border-[#E0E1EA]">
              {renderListValue(
                <Image src={blueClock} alt="location" width={14} height={14} />,

                selectedMatchData?.eventTime
              )}
            </div>
            {renderListValue(
              <Image
                src={blueLocation}
                alt="location"
                width={14}
                height={14}
              />,

              selectedMatchData?.Venue
            )}
          </div>
        </div>
        <div className="px-[24px] py-[10px] border-b-[1px] border-[#E0E1EA]">
          <div className="w-[250px]">
            <ToggleStatus
              listItems={listItems}
              selectedItem={selectedItem}
              onClick={handleSelectedItemClick}
            />
          </div>
        </div>
        <div className="px-[24px] py-[10px] border-b-[1px] border-[#E0E1EA]">
          <InventoryFilterForm
            formFieldValues={formFieldValues}
            handleChange={handleChange}
          />
        </div>
        <div className="border-b-[1px] border-[#E0E1EA]">
          <div className="px-[21px] flex gap-3 items-center w-fit border-r-[1px] py-[10px] border-[#E0E1EA] ">
            {renderListItem(
              <Image src={hamburger} width={18} height={18} alt="logo" />,
              162
            )}
            {renderListItem(
              <Image src={blueTicket} width={18} height={18} alt="logo" />,
              162
            )}
            <div className="border-[1px] border-[#DADBE5] p-[4px]">
              <IconStore.reload className="size-3.5" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-[24px] pb-[24px] flex relative">
        {!showMap && (
          <div
            onClick={() => setShowMap(!showMap)}
            className={`absolute top-10 z-[10] ${
              showMap ? "left-[265px]" : "-left-9"
            } cursor-pointer -translate-y-1/2 -rotate-90  origin-center transition-all duration-300`}
          >
            <div className="px-3 text-white flex items-center gap-1 py-2 bg-[#3E2E7E] rounded-md">
              <p className="text-white text-[12px] font-medium">View Map</p>
              <IconStore.chevronDown
                className={`stroke-white text-white size-3 transition-transform duration-300 ${
                  showMap ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        )}
        <div
          className={`transition-all duration-300  h-full
 overflow-hidden ${
   showMap ? "w-[50%] border-r-[1px] border-[#DADBE5]" : "w-0"
 }`}
        >
          <PinPatchMap
            onClose={() => {
              setShowMap(false);
            }}
          />
        </div>
        <div
          className={`bg-white rounded-lg max-h-[450px] overflow-scroll ${
            showMap ? "w-[50%]" : "w-full"
          }`}
        >
          <StickyDataTable
            headers={headers}
            data={data}
            rightStickyColumns={rightStickyColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryFolder;
