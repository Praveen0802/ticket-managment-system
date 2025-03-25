import CustomSelect from "@/components/commonComponents/customSelect";
import { fetchOrderHistory } from "@/utils/apiHandler/request";
import React, { useState, useEffect, useRef } from "react";

const LatestBookingTable = ({ listValues, meta }) => {
  const [bookings, setBookings] = useState(listValues);
  const [currentPage, setCurrentPage] = useState(meta?.current_page);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef(null);
  console.log(meta, "metameta");
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date, time) => {
    return `${formatDate(date)} ${time}`;
  };

  const filterValues = {
    options: [
      { value: "today", label: "last 7 days" },
      { value: "15days", label: "last 15 days" },
      { value: "30days", label: "last 30 days" },
      { value: "45days", label: "last 45 days" },
    ],
    selectedOption: "today",
    onchange: () => {},
  };

  const handleFilterChange = () => {};

  // Function to fetch the next page
  const fetchNextPage = async () => {
    if (loading || currentPage >= meta?.last_page) return;
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const data = await fetchOrderHistory("", { page: nextPage });
      setBookings((prevBookings) => [...prevBookings, ...data.order_history]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Scroll event handler
  const handleScroll = () => {
    const container = tableRef.current;
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 50
    ) {
      // User is near the bottom of the container
      fetchNextPage();
    }
  };

  // UseEffect to add the scroll event listener
  useEffect(() => {
    const container = tableRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll); // Cleanup on component unmount
    };
  }, [loading, currentPage]);

  return (
    <div className="flex flex-col h-full">
      <div className="w-full h-full flex flex-col gap-4 md:gap-5 bg-[#F5F7FA]">
        <div className="bg-white border border-[#eaeaf1] h-full flex flex-col gap-3 md:gap-5 rounded-md ">
          <div className="flex flex-col gap-2">
            <div className="flex gap-5 items-center p-3 md:p-5 border-b-[1px] border-[#eaeaf1]">
              <p className="text-[#323A70] font-medium text-sm md:text-[18px] whitespace-nowrap">
                Booking History
              </p>
              <CustomSelect
                selectedValue={""}
                options={filterValues?.options}
                onSelect={handleFilterChange}
                textSize="text-xs md:text-sm"
                buttonPadding="px-2 md:px-3 py-1 md:py-[2px]"
                dropdownItemPadding="py-[6px] pl-2 pr-4 md:pr-6"
              />
            </div>

            <div
              className="overflow-auto max-h-[350px] px-3 md:px-5"
              ref={tableRef}
            >
              <table className="min-w-full border-collapse">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-gray-400">
                    <th className="p-3 text-left text-sm font-medium">Match</th>
                    <th className="p-3 text-left text-sm font-medium">
                      Date & Time
                    </th>
                    <th className="p-3 text-left text-sm font-medium">Venue</th>
                    <th className="p-3 text-left text-sm font-medium">Qty</th>
                    <th className="p-3 text-left text-sm font-medium">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr
                      key={booking?.booking_id}
                      className="border-t border-[#eaeaf1] hover:bg-gray-50"
                    >
                      <td className="p-3 text-sm text-gray-700">
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {booking?.match_name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {booking?.tournament_name}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        {formatDateTime(
                          booking?.match_date,
                          booking?.match_time
                        )}
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        <div className="flex flex-col">
                          <span>{booking?.stadium_name}</span>
                          <span className="text-xs text-gray-500">
                            {booking?.city_name}, {booking?.country_name}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-700 text-center">
                        {booking?.quantity}
                      </td>
                      <td className="p-3 text-sm font-medium">
                        {booking?.price_with_currency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {loading && <div className="text-center py-2">Loading...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBookingTable;
