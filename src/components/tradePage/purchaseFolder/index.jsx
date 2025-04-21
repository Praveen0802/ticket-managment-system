import React, { useState, useEffect } from "react";
import AvailableList from "../components/availableList";
import FloatingSelect from "@/components/floatinginputFields/floatingSelect";
import FloatingDateRange from "@/components/commonComponents/dateRangeInput";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import StickyDataTable from "../components/stickyDataTable";
import FloatingLabelInput from "@/components/floatinginputFields";
import { purchaseHistory } from "@/utils/apiHandler/request";
import OrderDetails from "@/components/orderDetails";

const PurchaseFolder = (props) => {
  const { response } = props;
  const [listTicketDetails, setListTicketDetails] = useState(response?.data);
  const [selectedTicketStatus, setSelectedTicketStatus] = useState("");
  const [selectedBookingStatus, setSelectedBookingStatus] = useState("");
  const [displayTabValues, setDisplayTabValues] = useState({
    total_count: response?.total_count,
    details_required: response?.details_required,
    expired_count: response?.expired_count,
    upcoming_count: response?.upcoming_count,
  });
  const [checkboxValue, setCheckboxValue] = useState({
    upcomming: false,
    expired: false,
  });
  const [selectedMatch, setSelectedMatch] = useState("");
  const [listItems, setListItems] = useState([
    { name: "Purchases", value: displayTabValues?.total_count },
    {
      name: "Upcomming Event",
      value: displayTabValues?.upcoming_count,
      showCheckbox: true,
      key: "upcomming",
      isChecked: checkboxValue?.upcomming,
    },
    {
      name: "Past Events",
      value: displayTabValues?.expired_count,
      showCheckbox: true,
      key: "expired",
      isChecked: checkboxValue?.expired,
    },
    { name: "Details Required", value: displayTabValues?.details_required },
  ]);
  const [filtersApplied, setFiltersApplied] = useState({});
  const [eventDate, setEventDate] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [showOrderPopup, setShowOrderPopup] = useState({
    flag: false,
    data: {},
  });
  const [loader, setLoader] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Check if the screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const eyeIconClick = async (item) => {
    const response = await purchaseHistory("", {
      booking_no: item?.booking_no,
    });
    setShowOrderPopup({
      flag: true,
      data: response?.[0],
    });
  };

  const headers = [
    { key: "status", label: "Status", sortable: true },
    { key: "listmyTicket", label: "List my Ticket ID", sortable: true },
    { key: "bookingNo", label: "Booking No", sortable: true },
    { key: "orderDate", label: "Order Date", sortable: true },
    { key: "event", label: "Event", sortable: true },
    { key: "venue", label: "Venue", sortable: true },
    { key: "eventDate", label: "Event Date", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "ticketType", label: "Ticket Type", sortable: true },
    { key: "qty", label: "Qty", sortable: true },
    { key: "ticketPrice", label: "Ticket Price", sortable: true },
    { key: "total", label: "Total", sortable: true },
  ];

  const data = listTicketDetails?.map((item) => {
    return {
      status: item?.ticket_status,
      listmyTicket: item?.booking_no,
      bookingNo: item?.booking_no,
      orderDate: item?.booking_date,
      event: item?.match_name,
      venue: item?.venue_name,
      eventDate: item?.match_datetime,
      category: item?.seat_category,
      ticketType: item?.ticket_type_name,
      qty: item?.quantity,
      ticketPrice: `${item?.currency_icon}${item?.ticket_price}`,
      total: `${item?.currency_icon}${item?.total_ticket_price}`,
    };
  });

  const rightStickyColumns = listTicketDetails?.map((item) => {
    return [
      {
        icon: (
          <IconStore.eye
            onClick={() => eyeIconClick(item)}
            className="size-5"
          />
        ),
        className: " cursor-pointer",
      },
    ];
  });

  const fetchAPiDetails = async (params) => {
    setLoader(true);
    const response = await purchaseHistory("", params);
    const { data = [], ...rest } = response;
    setListTicketDetails(data);
    setDisplayTabValues(rest);
    const updatedListItems = [
      { name: "Purchases", value: response?.total_count },
      {
        name: "Upcomming Event",
        value: response?.upcoming_count,
        showCheckbox: true,
        key: "upcomming",
        isChecked: params?.upcomming ? params?.upcomming : false,
      },
      {
        name: "Past Events",
        value: response?.expired_count,
        showCheckbox: true,
        key: "expired",
        isChecked: params?.expired ? params?.expired : false,
      },
      { name: "Details Required", value: response?.details_required },
    ];

    setListItems(updatedListItems);
    setFiltersApplied(params);
    setLoader(false);
  };

  const handleMatchSearch = (e, key, type) => {
    const value = e?.target?.value;
    setSelectedMatch(value);
    const params = {
      ...filtersApplied,
      match_name: value,
    };
    fetchAPiDetails(params);
  };

  const handleDateChange = (dateRange, key) => {
    let params = {};
    if (key == "eventDate") {
      setEventDate(dateRange);
      params = {
        ...filtersApplied,
        event_date_from: dateRange?.startDate,
        event_date_to: dateRange?.endDate,
      };
    }
    if (key == "orderDate") {
      setOrderDate(dateRange);
      params = {
        ...filtersApplied,
        order_date_from: dateRange?.startDate,
        order_date_to: dateRange?.endDate,
      };
    }
    fetchAPiDetails(params);
  };
  const toggleItem = (index) => {
    const updatedItems = listItems?.map((item, i) => {
      if (i === index) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    setListItems(updatedItems);
    const key = listItems[index]?.key;
    const updatedCheckboxValue = {
      ...checkboxValue,
      [key]: !checkboxValue[key],
    };
    setCheckboxValue(updatedCheckboxValue);
    const params = {
      ...filtersApplied,
      upcomming: updatedCheckboxValue?.upcomming ? 1 : 0,
      expired: updatedCheckboxValue?.expired ? 1 : 0,
    };
    fetchAPiDetails(params);
  };

  const handleSelectChange = (e, key) => {
    const value = e;
    key == "ticket_status"
      ? setSelectedTicketStatus(value)
      : setSelectedBookingStatus(value);

    const params = {
      ...filtersApplied,
      [key]: value,
    };
    fetchAPiDetails(params);
  };

  // Mobile filters rendering
  const renderMobileFilters = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <button
          className="flex items-center gap-2 text-[#323A70] font-medium"
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
        >
          <span>{isFilterExpanded ? "Hide Filters" : "Show Filters"}</span>
          <IconStore.chevronDown
            className={`size-4 transition-transform duration-300 ${
              isFilterExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
        <span className="text-sm text-gray-500">{data?.length} purchases</span>
      </div>

      {isFilterExpanded && (
        <div className="flex flex-col gap-4">
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
            autoComplete="off"
          />

          <FloatingDateRange
            id="eventDate"
            name="eventDate"
            keyValue="eventDate"
            parentClassName="!w-full"
            label="Event Date"
            className="!py-[8px] !px-[16px] text-xs"
            value={eventDate}
            onChange={(dateValue) => handleDateChange(dateValue, "eventDate")}
          />

          <FloatingDateRange
            id="orderDate"
            name="orderDate"
            keyValue="orderDate"
            parentClassName="!w-full"
            label="Order Date"
            className="!py-[8px] !px-[16px] text-xs"
            value={orderDate}
            onChange={(dateValue) => handleDateChange(dateValue, "orderDate")}
          />

          <FloatingSelect
            label={"Ticket Status"}
            options={[
              { value: "fulfilled", label: "Fulfilled" },
              { value: "incomplete", label: "Incomplete" },
            ]}
            selectedValue={selectedTicketStatus}
            keyValue="ticket_status"
            className="!w-full"
            onSelect={(e) => {
              handleSelectChange(e, "ticket_status");
            }}
            paddingClassName="!py-[6px] !px-[12px] w-full text-xs"
          />

          <FloatingSelect
            label={"Booking Status"}
            options={[
              { value: 0, label: "Failed" },
              { value: 1, label: "Confirmed" },
              { value: 2, label: "Pending" },
              { value: 3, label: "Cancelled" },
              { value: 4, label: "Shipped" },
              { value: 5, label: "Delivered" },
              { value: 6, label: "Downloaded" },
              { value: 8, label: "Rejected" },
            ]}
            selectedValue={selectedBookingStatus}
            keyValue="booking_status"
            className="!w-full"
            onSelect={(e) => {
              handleSelectChange(e, "booking_status");
            }}
            paddingClassName="!py-[6px] !px-[12px] w-full text-xs"
          />
        </div>
      )}
    </>
  );

  // Desktop filters rendering - maintain original layout
  const renderDesktopFilters = () => (
    <div className="md:flex gap-4 items-center md:w-[90%]">
      <FloatingLabelInput
        id="selectedMatch"
        name="selectedMatch"
        keyValue={"selectedMatch"}
        type="text"
        label="Search Match Event"
        value={selectedMatch}
        className={"!py-[7px] !px-[12px] !text-[#323A70] !text-[14px] "}
        onChange={handleMatchSearch}
        paddingClassName=""
        autoComplete="off"
      />
      <FloatingDateRange
        id="eventDate"
        name="eventDate"
        keyValue="eventDate"
        parentClassName="!w-[350px]"
        label="Event Date"
        className="!py-[8px] !px-[16px] mobile:text-xs"
        value={eventDate}
        onChange={(dateValue) => handleDateChange(dateValue, "eventDate")}
      />
      <FloatingDateRange
        id="orderDate"
        name="orderDate"
        keyValue="orderDate"
        parentClassName="!w-[350px]"
        label="Order Date"
        className="!py-[8px] !px-[16px] mobile:text-xs"
        value={orderDate}
        onChange={(dateValue) => handleDateChange(dateValue, "orderDate")}
      />
      <FloatingSelect
        label={"Ticket Status"}
        options={[
          { value: "fulfilled", label: "Fulfilled" },
          { value: "incomplete", label: "Incomplete" },
        ]}
        selectedValue={selectedTicketStatus}
        keyValue="ticket_status"
        className="!w-[30%]"
        onSelect={(e) => {
          handleSelectChange(e, "ticket_status");
        }}
        paddingClassName="!py-[6px] !px-[12px] w-full mobile:text-xs"
      />
      <FloatingSelect
        label={"Booking Status"}
        options={[
          { value: 0, label: "Failed" },
          { value: 1, label: "Confirmed" },
          { value: 2, label: "Pending" },
          { value: 3, label: "Cancelled" },
          { value: 4, label: "Shipped" },
          { value: 5, label: "Delivered" },
          { value: 6, label: "Downloaded" },
          { value: 8, label: "Rejected" },
        ]}
        selectedValue={selectedBookingStatus}
        keyValue="booking_status"
        className="!w-[30%]"
        onSelect={(e) => {
          handleSelectChange(e, "booking_status");
        }}
        paddingClassName="!py-[6px] !px-[12px] w-full mobile:text-xs"
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="bg-white">
        {/* Tabs section - make scrollable on mobile */}
        <div className="px-[24px] py-[20px] border-b-[1px] border-[#E0E1EA] overflow-x-auto">
          <div className="flex gap-4  flex-nowrap min-w-min md:min-w-0">
            {listItems?.map((item, index) => {
              return (
                <AvailableList
                  key={index}
                  list={{
                    name: item?.name,
                    value: item?.value,
                    showCheckbox: item?.showCheckbox,
                    isChecked: item?.isChecked,
                    onCheckChange: () => toggleItem(index),
                    onClick: item?.showCheckbox
                      ? () => toggleItem(index)
                      : undefined,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Filters section */}
        <div className="px-[24px] py-[20px] border-b-[1px] border-[#E0E1EA]">
          {isMobile ? renderMobileFilters() : renderDesktopFilters()}
        </div>

        {/* Purchase count - hidden on mobile since we show it in filters section */}
        <div
          className={`border-b-[1px] border-[#E0E1EA] ${
            isMobile ? "hidden" : ""
          }`}
        >
          <div
            className={
              "p-[20px] text-[14px] w-fit text-[#323A70] font-semibold border-r-[1px] border-[#E0E1EA]"
            }
          >
            {data?.length} purchases
          </div>
        </div>
      </div>

      {/* Data table section - add horizontal scroll for mobile */}
      <div className="bg-white shadow rounded-lg mx-[24px] overflow-x-auto">
        <StickyDataTable
          headers={headers}
          data={data}
          rightStickyColumns={rightStickyColumns}
          loading={loader}
        />
      </div>

      <OrderDetails
        show={showOrderPopup?.flag}
        data={showOrderPopup?.data}
        onClose={() => setShowOrderPopup({ flag: false, data: {} })}
      />
    </div>
  );
};

export default PurchaseFolder;
