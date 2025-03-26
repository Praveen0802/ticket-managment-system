import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState, useRef, useEffect } from "react";

const CollapsablePaymentTable = ({ sections, onRowClick, selectedTab }) => {
  const [expandedSections, setExpandedSections] = useState(
    sections.map((_, index) => index === 0)
  );

  const contentRefs = useRef(sections.map(() => React.createRef()));
  const [contentHeights, setContentHeights] = useState(sections.map(() => 0));

  useEffect(() => {
    // Calculate heights of all section contents
    contentRefs.current.forEach((ref, index) => {
      if (ref.current) {
        setContentHeights((prev) => {
          const newHeights = [...prev];
          newHeights[index] = ref.current.scrollHeight;
          return newHeights;
        });
      }
    });
  }, [sections]);

  const toggleSection = (index) => {
    const newExpandedSections = [...expandedSections];
    newExpandedSections[index] = !newExpandedSections[index];
    setExpandedSections(newExpandedSections);
  };

  return (
    <div className="w-full flex flex-col gap-4 mobile:gap-2">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-1 overflow-hidden">
          {/* Section Header */}
          <div
            className="flex items-center justify-between bg-[#130061] rounded-t-xl text-white px-4 py-3 cursor-pointer mobile:px-3 mobile:py-2"
            onClick={() => toggleSection(sectionIndex)}
          >
            <h3 className="text-[14px] font-semibold mobile:text-xs">
              {section.title}
            </h3>
            <svg
              className={`w-5 h-5 mobile:w-4 mobile:h-4 transition-transform duration-300 ${
                expandedSections[sectionIndex] ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>

          {/* Section Content with Animation */}
          <div
            ref={contentRefs.current[sectionIndex]}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: expandedSections[sectionIndex]
                ? `${contentHeights[sectionIndex]}px`
                : "0px",
              opacity: expandedSections[sectionIndex] ? 1 : 0,
            }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white mobile:text-xs">
                <thead>
                  <tr>
                    {section.headers.map((header, idx) => (
                      <th
                        key={idx}
                        className="p-3 mobile:p-2 text-left text-[12px] mobile:text-[10px] text-[#7D82A4] font-normal border border-[#E0E1EA]"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="mobile:text-xs">
                      {Object.entries(row).map(([key, values], cellIndex) => {
                        if (key == "id") return null;
                        const statusKey = key === "status";
                        const eyeKey = key === "eye";
                        return (
                          <td
                            onClick={() => {
                              eyeKey &&
                                onRowClick(
                                  row,
                                  selectedTab == "transaction"
                                    ? "transaction"
                                    : "wallet"
                                );
                            }}
                            className={`py-3 pl-4 mobile:py-2 mobile:pl-2 ${
                              key === "eye" && "w-[56px] hover:bg-gray-100"
                            } text-left text-[12px] mobile:text-[10px] border-b border-[#E0E1EA] ${
                              statusKey
                                ? values?.toLowerCase() === "paid"
                                  ? "!text-[#03BA8A] w-fit px-[6px] py-[4px] rounded-md"
                                  : values?.toLowerCase() === "pending"
                                  ? "text-[#F57B1B] w-fit px-[6px] py-[4px] rounded-md"
                                  : ""
                                : ""
                            } ${eyeKey && "border-l-[1px] cursor-pointer"} ${
                              cellIndex === section.headers.length - 1 &&
                              (values === "Sent" || values === "Approved")
                                ? "text-green-400"
                                : "text-[#323A70]"
                            } ${
                              cellIndex === 0
                                ? "border-l border-[#E0E1EA]"
                                : cellIndex === section.headers.length - 1
                                ? "border-r border-[#E0E1EA]"
                                : ""
                            }`}
                            key={cellIndex}
                          >
                            {key === "eye" && values ? (
                              <IconStore.eye className="stroke-black size-4 mobile:size-3" />
                            ) : (
                              values
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollapsablePaymentTable;
