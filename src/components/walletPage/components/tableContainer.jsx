import React from "react";
import TransactionTable from "./transactionTable";
import { IconStore } from "@/utils/helperFunctions/iconStore";

const TableContainer = ({
  transactionStatus,
  contentRefs,
  toggleMonth,
  expandedMonths,
}) => {
  return (
    <>
      {transactionStatus.map((monthData, index) => {
        // Initialize contentRef for this month if it doesn't exist
        if (!contentRefs.current[monthData.key]) {
          contentRefs.current[monthData.key] = React.createRef();
        }

        return (
          <div key={index} className="mb-4">
            <div
              className="bg-[#2B0B5A] text-white py-3 px-4 flex justify-between rounded-md items-center cursor-pointer"
              onClick={() => toggleMonth(monthData.key)}
            >
              <h3 className="font-medium">{monthData.key}</h3>
              <IconStore.chevronDown
                className={`size-5 transition-transform duration-300 ease-in-out ${
                  expandedMonths[monthData.key] ? "rotate-180" : ""
                }`}
              />
            </div>

            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                height: expandedMonths[monthData.key]
                  ? `${
                      contentRefs.current[monthData.key].current?.scrollHeight
                    }px`
                  : "0px",
                opacity: expandedMonths[monthData.key] ? 1 : 0,
              }}
            >
              <div ref={contentRefs.current[monthData.key]}>
                <TransactionTable transactions={monthData.value} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TableContainer;
