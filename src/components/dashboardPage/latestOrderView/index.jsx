import CustomSelect from "@/components/commonComponents/customSelect";
import {
  fetchOrderHistory,
  fetchTransactionHistory,
} from "@/utils/apiHandler/request";
import React, { useState, useEffect, useRef } from "react";

const LatestOrderView = ({ listItems, meta }) => {
  const [transactions, setTransactions] = useState(listItems);
  const [currentPage, setCurrentPage] = useState(meta?.current_page);
  const [loading, setLoading] = useState(false);
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

  const fetchNextPage = async () => {
    if (loading || currentPage >= meta?.last_page) return;
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const data = await fetchTransactionHistory("", { page: nextPage });
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        ...data.order_history,
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
  }, [loading, currentPage]);

  return (
    <div className="flex flex-col h-full">
      <div className="w-full h-full flex flex-col gap-4 md:gap-5 bg-[#F5F7FA]">
        <div className="bg-white border border-[#eaeaf1] h-full flex flex-col gap-3 md:gap-5 rounded-md ">
          <div className="flex flex-col gap-2">
            <div className="flex gap-5 items-center p-3 md:p-5 border-b-[1px] border-[#eaeaf1]">
              <p className="text-[#323A70] font-medium text-sm md:text-[18px] whitespace-nowrap">
                Transaction History
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

            {/* This div controls the scrolling */}
            <div className="overflow-auto h-full px-3 md:px-5" ref={tableRef}>
              <table className="min-w-full border-collapse">
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
                  {transactions?.map((transaction) => (
                    <tr
                      key={transaction?.id}
                      className="border-t border-[#eaeaf1]"
                    >
                      <td className="p-3 text-sm text-gray-700">
                        {transaction?.reference_no}
                      </td>
                      <td className="p-3 text-sm text-gray-700">
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
            </div>

            {loading && <div className="text-center py-2">Loading...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestOrderView;
