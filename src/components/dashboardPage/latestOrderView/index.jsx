import CustomSelect from "@/components/commonComponents/customSelect";
import {
  fetchOrderHistory,
  fetchTransactionHistory,
} from "@/utils/apiHandler/request";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import useIsMobile from "@/utils/helperFunctions/useIsmobile";
import React, { useState, useEffect, useRef } from "react";

const ShimmerRow = ({ isMobile }) => {
  if (isMobile) {
    return (
      <div className="border-t border-[#eaeaf1] p-3 flex justify-between items-center">
        <div className="flex flex-col w-2/3 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="flex flex-col items-end w-1/3 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3 animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Desktop/Web Shimmer
  return (
    <tr className="border-t border-[#eaeaf1]">
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mt-2 animate-pulse"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
      </td>
      <td className="p-3">
        <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
      </td>
    </tr>
  );
};

const LatestOrderView = ({ listItems, meta }) => {
  const [transactions, setTransactions] = useState(listItems);
  const [currentPage, setCurrentPage] = useState(meta?.current_page);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const tableRef = useRef(null);

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isMobile = useIsMobile();

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
    try {
      const response = await fetchTransactionHistory("", {
        ...(option && { days: option }),
        page: 1,
      });
      setTransactions(response?.transaction_history || []);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setLoading(false);
    }
  };


  const fetchNextPage = async () => {
    if (loading || currentPage >= meta?.last_page) return;
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const data = await fetchTransactionHistory("", {
        page: nextPage,
        days: selectedFilter,
      });
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        ...(data?.transaction_history || []),
      ]);
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
  }, [loading, currentPage, selectedFilter]);

  return (
    <div className="flex flex-col h-full">
      <div className="w-full h-full flex flex-col gap-4 md:gap-5 bg-[#F5F7FA]">
        <div className="bg-white border border-[#eaeaf1] h-full flex flex-col gap-3 md:gap-5 rounded-md">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row justify-between sm:gap-5 items-start sm:items-center p-3 md:p-5 border-b-[1px] border-[#eaeaf1]">
              <p className="text-[#323A70] font-medium text-sm md:text-[18px] whitespace-nowrap">
                Transaction History
              </p>
              <CustomSelect
                selectedValue={selectedFilter}
                options={filterValues?.options}
                onSelect={handleFilterChange}
                className="!w-[170px]"
                textSize="text-xs md:text-sm"
                buttonPadding="px-2 md:px-3 py-1 md:py-[2px] !w-[170px]"
                dropdownItemPadding="py-[6px] pl-2 pr-4 md:pr-6"
              />
            </div>

            <div
              className="overflow-auto h-full px-3 md:px-5 max-h-[350px]"
              ref={tableRef}
            >
              {/* Desktop Table View */}
              <table className="min-w-full border-collapse hidden sm:table">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-gray-400">
                    <th className="p-3 text-left text-sm font-medium">
                      Reference No
                    </th>
                    <th className="p-3 text-left text-sm font-medium">
                      Date & Time
                    </th>
                    <th className="p-3 text-left text-sm font-medium">Type</th>
                    <th className="p-3 text-left text-sm font-medium">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array(5)
                        .fill()
                        .map((_, index) => <ShimmerRow key={index} />)
                    : transactions?.map((transaction) => (
                        <tr
                          key={transaction?.id}
                          className="border-t border-[#eaeaf1]"
                        >
                          <td className="p-3 text-sm text-[#323A70]">
                            {transaction?.reference_no}
                          </td>
                          <td className="p-3 text-sm flex gap-1 items-center text-[#323A70]">
                            <IconStore.calendarDays className="size-4" />{" "}
                            {formatDateTime(transaction?.created_date_time)}
                          </td>
                          <td className="p-3 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                transaction?.credit_depit === "CREDIT"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {transaction?.credit_depit}
                            </span>
                          </td>
                          <td className="p-3 text-sm font-medium">
                            <div className="flex items-center">
                              <span
                                className={
                                  transaction?.credit_depit === "CREDIT"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {transaction?.price_with_currency}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>

              {/* Mobile List View */}
              <div className="sm:hidden">
                {loading
                  ? Array(5)
                      .fill()
                      .map((_, index) => (
                        <ShimmerRow key={index} isMobile={isMobile} />
                      ))
                  : transactions?.map((transaction) => (
                      <div
                        key={transaction?.id}
                        className="border-t border-[#eaeaf1] p-3 flex justify-between items-center"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm text-[#323A70] font-medium">
                            {transaction?.reference_no}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <IconStore.calendarDays className="size-4" />
                            {formatDateTime(transaction?.created_date_time)}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span
                            className={`px-2 py-1 rounded-full text-xs mb-1 ${
                              transaction?.credit_depit === "CREDIT"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {transaction?.credit_depit}
                          </span>
                          <span
                            className={
                              transaction?.credit_depit === "CREDIT"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {transaction?.price_with_currency}
                          </span>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestOrderView;
