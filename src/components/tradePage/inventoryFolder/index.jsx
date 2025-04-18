import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState } from "react";
import blueLocation from "../../../../public/blue-location.svg";
import Image from "next/image";
import blueCalendar from "../../../../public/blue-calendar.svg";
import blueTicket from "../../../../public/blue-ticket.svg";
import hamburger from "../../../../public/hamburger.svg";
import blueClock from "../../../../public/blue-clock.svg";
import ToggleStatus from "./components/toggleStatus";
import beforeFaviurates from "../../../../public/before-favourates.svg";
import attachmentPin from "../../../../public/attachment-pin.svg";
import attachment6 from "../../../../public/attachment-6.svg";
import attachment3 from "../../../../public/attachment-3.svg";
import attachment1 from "../../../../public/attachment-1.svg";
import crossHand from "../../../../public/cross-hand.svg";
import oneHand from "../../../../public/One-hand.svg";
import star from "../../../../public/Star.svg";
import InventoryFilterForm from "./inventoryFilterForm";
import Button from "@/components/commonComponents/button";
import documentText from "../../../../public/document-text.svg";
import StickyDataTable from "../components/stickyDataTable";
import PinPatchMap from "./pinPatchMap";
import { dateFormat, desiredFormatDate } from "@/utils/helperFunctions";
import {
  purchaseEvents,
  purchaseFavouratesTracking,
  purchaseTickets,
} from "@/utils/apiHandler/request";
import NonMatchSelectUI from "./nonMatchIdUI";
import { useDispatch } from "react-redux";
import { updateConfirmPurchasePopup } from "@/utils/redux/common/action";
import OrderDetails from "@/components/orderDetails";

const InventoryFolder = (props) => {
  const { response = {}, matchId } = props;
  const {
    match_details = {},
    ticket_details = [],
    totalAmount = "",
    filters = {},
  } = response;
  const [selectedItem, setSelectedItem] = useState("all");
  const [displayTicketDetails, setDisplayTicketDetails] =
    useState(ticket_details);
  const [filtersApplied, setFiltersApplied] = useState({ page: 1 });
  const [showMap, setShowMap] = useState(true);
  const defaultFilters = {
    category: "",
    quantity: "",
    ticket_type_id: "",
  };
  const [formFieldValues, setFormFieldValues] = useState(defaultFilters);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const selectedMatchData = {
    match: `${match_details?.match_name}`,
    eventDate: desiredFormatDate(match_details?.match_date),
    eventTime: match_details?.match_time,
    Venue: `${match_details?.venue},${match_details?.country},${match_details?.city}`,
  };

  const renderListValue = (icon, text) => {
    return (
      <div className="flex gap-[8px] items-center">
        {icon}
        <p className="text-[12px] font-normal text-[#323A70]">{text}</p>
      </div>
    );
  };

  const fetchAPIDetails = async (params, pagination = false) => {
    setLoader(true);
    const response = await purchaseEvents("", matchId, params);
    if (pagination) {
      setDisplayTicketDetails([
        ...displayTicketDetails,
        ...response?.ticket_details,
      ]);
    } else {
      setDisplayTicketDetails([...response?.ticket_details]);
    }
    setLoader(false);
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
    console.log(value, "valuevaluevalue");
    if (selectType) {
      let params = {
        ...filtersApplied,
        page: 1,
        [key]: value,
      };
      setFiltersApplied(params);
      fetchAPIDetails(params);
    }
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

  const fetchScrollEnd = async () => {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const params = {
      page: filtersApplied?.page + 1,
      ...filtersApplied,
    };

    await fetchAPIDetails(params, true);
    setFiltersApplied(params);
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  };

  const headers = [
    { key: "qty", label: "Qty", sortable: true },
    { key: "category", label: "Category", sortable: true },
    { key: "section", label: "Section/Block", sortable: true },
    { key: "row", label: "Row", sortable: true },
    { key: "ticketPrice", label: "Ticket Price", sortable: true },
  ];

  const data = displayTicketDetails?.map((item) => {
    return {
      qty: item?.quantity,
      category: item?.seat_category,
      section: item?.block_id,
      row: item?.row,
      ticketPrice: item?.price_with_symbol,
    };
  });

  const handleClickFavourites = async (item) => {
    if (item?.trackingfound == 1) return;
    const payload = {
      m_id: matchId,
      s_no: item?.s_no,
    };
    const response = await purchaseFavouratesTracking("", "POST", payload);
    const updatedTicketDetails = displayTicketDetails?.map((ticket) => {
      if (ticket?.s_no == item?.s_no) {
        return {
          ...ticket,
          trackingfound: 1,
        };
      }
      return ticket;
    });

    setDisplayTicketDetails(updatedTicketDetails);
  };

  const handleClickItem = async (item) => {
    const data = await purchaseTickets("", item?.s_no, {
      currency: item?.price_type,
    });
    dispatch(
      updateConfirmPurchasePopup({
        flag: true,
        data: { ...data, sNo: item?.s_no },
      })
    );
  };

  const resetFilters = () => {
    setFiltersApplied({ page: 1 });
    setFormFieldValues(defaultFilters);
    fetchAPIDetails({ page: 1 });
  };

  const rightStickyColumns = displayTicketDetails?.map((item) => {
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
              handleClickFavourites(item);
            }}
            width={20}
            height={20}
            src={item?.trackingfound == 1 ? star : beforeFaviurates}
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
            onClick={() => {
              handleClickItem(item);
            }}
          />
        ),
        key: "buy",
      },
    ];
  });

  return (
    <>
      {matchId ? (
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
                    <Image
                      src={blueClock}
                      alt="location"
                      width={14}
                      height={14}
                    />,

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

            <div className="px-[24px] py-[20px] border-b-[1px] border-[#E0E1EA]">
              <InventoryFilterForm
                formFieldValues={formFieldValues}
                handleChange={handleChange}
                filters={filters}
              />
            </div>
            <div className="border-b-[1px] border-[#E0E1EA]">
              <div className="px-[21px] flex gap-3 items-center w-fit border-r-[1px] py-[10px] border-[#E0E1EA] ">
                {renderListItem(
                  <Image src={hamburger} width={18} height={18} alt="logo" />,
                  filters?.TotalQtyTickets
                )}
                {renderListItem(
                  <Image src={blueTicket} width={18} height={18} alt="logo" />,
                  filters?.TotalListingTickets
                )}
                <button
                  onClick={() => resetFilters()}
                  className="border-[1px] cursor-pointer border-[#DADBE5] p-[4px]"
                >
                  <IconStore.reload className="size-3.5" />
                </button>
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
overflow-hidden ${showMap ? "w-[50%] border-r-[1px] border-[#DADBE5]" : "w-0"}`}
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
                loading={loader}
                onScrollEnd={fetchScrollEnd}
              />
            </div>
          </div>
        </div>
      ) : (
        <NonMatchSelectUI />
      )}
      {/* <OrderDetails show={true} /> */}
    </>
  );
};

export default InventoryFolder;
