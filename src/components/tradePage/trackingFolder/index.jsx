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
import { dateFormat, desiredFormatDate } from "@/utils/helperFunctions";
import attachmentPin from "../../../../public/attachment-pin.svg";
import attachment6 from "../../../../public/attachment-6.svg";
import attachment3 from "../../../../public/attachment-3.svg";
import attachment1 from "../../../../public/attachment-1.svg";
import crossHand from "../../../../public/cross-hand.svg";
import {
  purchaseFavouratesTracking,
  purchaseTracking,
} from "@/utils/apiHandler/request";

const TrackingPage = (props) => {
  const { response = {} } = props;
  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTicketDetails, setSelectedTicketDetails] = useState(
    response?.ticket_details
  );
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [availableTypes, setAvailableTypes] = useState({
    available: response?.available,
    tracking: response?.tracking,
    sold: response?.sold,
  });
  const [loader, setLoader] = useState(false);
  const [filterApplied, setFIlterApplied] = useState({});
  const headers = [
    { key: "status", label: "Status", sortable: true },
    { key: "event", label: "Event", sortable: true },
    { key: "venue", label: "Venue", sortable: true },
    { key: "eventDate", label: "Event Date", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "ticketType", label: "Ticket Type", sortable: true },
    { key: "qty", label: "Qty", sortable: true },
  ];

  const trackingFetchApi = async (params, availablityStatus) => {
    setLoader(true);
    const response = await purchaseTracking("", "GET", params);
    setSelectedTicketDetails(response?.ticket_details);

    // First update availableTypes
    setAvailableTypes({
      available: response?.available,
      tracking: response?.tracking,
      sold: response?.sold,
    });
    console.log(availablityStatus, "availablityStatusavailablityStatus");
    // Then update items with the new values
    setItems([
      { name: "Tracking", value: response?.tracking, showCheckbox: false },
      {
        name: "Available",
        value: response?.available,
        showCheckbox: true,
        isChecked: availablityStatus,
      },
      {
        name: "Sold",
        value: response?.sold,
        showCheckbox: false,
        isChecked: false,
      },
    ]);

    setLoader(false);
  };

  const data = selectedTicketDetails?.map((item) => {
    return {
      status: item?.availability_status,
      event: item?.match_name,
      venue: item?.stadium_name,
      eventDate: desiredFormatDate(item?.match_date),
      category: item?.Category,
      ticketType: item?.ticket_type,
      qty: item?.quantity,
    };
  });

  const handleRemoveFavourite = async (item) => {
    const response = await purchaseFavouratesTracking(
      "",
      "DELETE",
      "",
      item?.tracking_id
    );
    setSelectedTicketDetails(
      selectedTicketDetails?.filter(
        (ticket) => ticket?.tracking_id !== item?.tracking_id
      )
    );
  };
  const rightStickyColumns = selectedTicketDetails?.map((item) => {
    return [
      {
        icon: (
          <Image
            width={14}
            height={14}
            src={
              item?.ticket_type_id == 2
                ? attachmentPin
                : item?.ticket_type_id == 4 || item?.ticket_type_id == 6
                ? attachment6
                : item?.ticket_type_id == 3
                ? attachment3
                : item?.ticket_type_id == 1
                ? attachment1
                : attachmentPin
            }
            alt="attach"
          />
        ),
        className: "cursor-pointer",
        key: "attach",
      },
      {
        icon: <Image width={16} height={16} src={crossHand} alt="hand" />,
        className: "cursor-pointer",
        key: "oneHand",
        tooltipComponent: (
          <p className="text-center">
            Expected Delivery Date:
            <br />
            {dateFormat(item?.expected_date_inhand)}
          </p>
        ),
        tooltipPosition: "top",
      },
      {
        icon: item?.listing_note?.length > 0 && (
          <Image width={20} height={20} src={documentText} alt="document" />
        ),
        className: "cursor-pointer",
        key: "document",
        tooltipComponent: item?.listing_note?.map((note, index) => (
          <div className="flex flex-col gap-2">
            <p className="text-left">Benifits/Restrictions</p>
            <ul
              className={`list-disc ml-[20px] ${
                item?.listing_note?.length > 3 && "grid grid-cols-2 gap-1"
              }`}
              key={index}
            >
              {Object.values(note).map((value, i) => (
                <li key={i}>{value}</li>
              ))}
            </ul>
          </div>
        )),
        tooltipPosition: "top",
      },
      {
        icon: (
          <Image
            onClick={() => {
              handleRemoveFavourite(item);
            }}
            width={20}
            height={20}
            src={star}
            alt="star"
          />
        ),
        className: "border-x-[1px] border-[#E0E1EA] cursor-pointer",
        key: "star",
      },
      {
        icon: (
          <Button
            label="Buy"
            classNames={{
              label_: "text-white text-xs sm:text-sm",
              root: "bg-[#0137D5] py-1 px-2 rounded-md hover:bg-[#0137D5] transition-colors whitespace-nowrap",
            }}
            // onClick={() => {
            //   handleClickItem(item);
            // }}
          />
        ),
        key: "buy",
      },
    ];
  });

  const [items, setItems] = useState([
    { name: "Tracking", value: availableTypes?.tracking, showCheckbox: false },
    {
      name: "Available",
      value: availableTypes?.available,
      showCheckbox: true,
      isChecked: false,
    },
    {
      name: "Sold",
      value: availableTypes?.sold,
      showCheckbox: false,
      isChecked: false,
    },
  ]);

  const toggleItem = async (index) => {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      )
    );
    console.log(availabilityStatus, "availabilityStatusavailabilityStatus");
    const params = {
      ...filterApplied,
      availability: availabilityStatus != 1 ? "" : 1,
    };
    await trackingFetchApi(params, availabilityStatus == 1 ? true : false);
    setAvailabilityStatus(availabilityStatus == 1 ? "" : 1);
    setFIlterApplied(params);
  };

  const handleMatchSearch = (e, key, type) => {
    const value = e?.target?.value;
    setSelectedMatch(value);
    const params = {
      ...filterApplied,
      search: value,
    };
    trackingFetchApi(params);
    setFIlterApplied(params);
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
            <FloatingLabelInput
              id="selectedMatch"
              name="selectedMatch"
              keyValue={"selectedMatch"}
              type="text"
              label="Search Match Event"
              value={selectedMatch}
              className={"!py-[7px] !px-[12px] !text-[#323A70] !text-[14px]"}
              onChange={handleMatchSearch}
              paddingClassName=""
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
                const params = {
                  ...filterApplied,
                  match_date: dateValue?.startDate,
                };
                trackingFetchApi(params);
                setFIlterApplied(params);
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
          loading={loader}
        />
      </div>
    </div>
  );
};

export default TrackingPage;
