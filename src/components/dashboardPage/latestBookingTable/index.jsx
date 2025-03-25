import CustomSelect from "@/components/commonComponents/customSelect";
import { fetchOrderHistory } from "@/utils/apiHandler/request";
import { useEffect, useRef, useState } from "react";

const LatestBookingTable = ({ listValues, meta }) => {
  const [bookings, setBookings] = useState(listValues);
  const [currentPage, setCurrentPage] = useState(meta?.current_page);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState();
  const tableRef = useRef(null);
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const ShimmerRow = () => {
    return (
      <tr className="border-t border-[#eaeaf1]">
        <td className="p-3">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </td>
        <td className="p-3">
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        </td>
        <td className="p-3">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </td>
        <td className="p-3 text-center">
          <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto animate-pulse"></div>
        </td>
        <td className="p-3">
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        </td>
      </tr>
    );
  };

  const formatDateTime = (date, time) => {
    return `${formatDate(date)} ${time}`;
  };

  const handleApiCall = async (params) => {
    const data = await fetchOrderHistory("", params);
    return data;
  };

  const filterValues = {
    options: [
      { value: "7", label: "last 7 days" },
      { value: "15", label: "last 15 days" },
      { value: "30", label: "last 30 days" },
      { value: "45", label: "last 45 days" },
    ],
    selectedOption: selectedFilter,
    onchange: (option) => {
      setSelectedFilter(option);
    },
  };

  const handleFilterChange = async (option) => {
    setLoading(true);
    setSelectedFilter(option);
    setCurrentPage(1);
    const response = await handleApiCall({ days: option, page: 1 });
    setBookings(response?.order_history);
    setLoading(false);
  };

  const fetchNextPage = async () => {
    if (loading || currentPage >= meta?.last_page) return;
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const data = await handleApiCall({
        page: nextPage,
        ...(selectedFilter && { days: selectedFilter }),
      });
      setBookings((prevBookings) => [...prevBookings, ...data.order_history]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const container = tableRef.current;
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 50
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const container = tableRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
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
                  {loading
                    ? Array(5)
                        .fill()
                        .map((_, index) => <ShimmerRow key={index} />)
                    : bookings.map((booking) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBookingTable;
