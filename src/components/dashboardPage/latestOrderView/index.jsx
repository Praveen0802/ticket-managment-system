import CustomSelect from "@/components/commonComponents/customSelect";
import React, { useState } from "react";

const LatestOrderView = ({ listItems }) => {
  const [transactions, setTransactions] = useState(listItems);

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
      { value: "yesterday", label: "last 15 days" },
      { value: "yesterday", label: "last 30 days" },
      { value: "yesterday", label: "last 45 days" },
    ],
    selectedOption: "today",
    onchange: () => {},
  };

  const handleFilterChange = () => {};

  return (
    <div className="flex flex-col h-full">
      <div className="w-full h-full flex flex-col gap-4 md:gap-5 bg-[#F5F7FA]">
        <div className="bg-white border border-[#eaeaf1] h-full flex flex-col gap-3 md:gap-5 rounded-md p-3 md:p-5">
          <div className="flex flex-col gap-5">
            <div className="flex gap-3 items-center">
              <p className="text-[#323A70] font-medium text-sm md:text-[18px] whitespace-nowrap">
                Transaction History
              </p>
              <CustomSelect
                selectedValue={""}
                options={filterValues?.options}
                onSelect={handleFilterChange}
                textSize="text-xs md:text-sm"
                buttonPadding="px-2 md:px-3 py-1 md:py-1.5"
                dropdownItemPadding="py-1 pl-2 pr-4 md:pr-6"
              />
            </div>
            {/* This div controls the scrolling */}
            <div className="overflow-auto h-full">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestOrderView;
