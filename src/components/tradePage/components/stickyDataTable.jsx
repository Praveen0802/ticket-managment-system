import React, { useEffect, useRef, useState } from "react";
import chevronDown from "../../../../public/chevron-down.svg";
import Image from "next/image";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import ChevronRight from "@/components/commonComponents/filledChevron/chevronRight";
import TooltipWrapper from "@/components/TooltipWrapper";

// Shimmer loading component for table cells
const ShimmerCell = ({ width = "100%" }) => (
  <div
    className="animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded h-6"
    style={{ width }}
  ></div>
);

const StickyDataTable = ({
  headers,
  data,
  rightStickyColumns = [],
  loading = false,
}) => {
  // Calculate the width of sticky columns based on the first row or a default
  const maxStickyColumnsLength =
    rightStickyColumns.length > 0
      ? Math.max(...rightStickyColumns.map((cols) => cols.length), 0)
      : 0;
  const stickyColumnsWidth = maxStickyColumnsLength * 50; // 50px per column

  // Split headers into regular and sticky columns
  const regularHeaders = headers.filter(
    (header) => !["actions", "buy"].includes(header.key)
  );

  // Refs for container and tables
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const mainTableRef = useRef(null);
  const stickyTableRef = useRef(null);

  // Track scroll position for shadow effect and navigation
  const [hasScrolled, setHasScrolled] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeTooltipKey, setActiveTooltipKey] = useState(null);

  // Generate shimmer loading rows
  const renderShimmerRows = (count = 5) => {
    return Array(count)
      .fill(0)
      .map((_, rowIndex) => ({
        id: `shimmer-${rowIndex}`,
        isShimmer: true,
      }));
  };

  // Data to display - either real data or shimmer placeholders
  const displayData = loading ? renderShimmerRows() : data;

  // Synchronize row heights on load and resize
  useEffect(() => {
    const syncRowHeights = () => {
      if (!mainTableRef.current || !stickyTableRef.current) return;

      // Reset heights first to avoid compounding issues
      const mainRows = mainTableRef.current.querySelectorAll("tbody tr");
      const stickyRows = stickyTableRef.current.querySelectorAll("tbody tr");

      mainRows.forEach((row) => (row.style.height = "auto"));
      stickyRows.forEach((row) => (row.style.height = "auto"));

      // Sync header heights
      const mainHeaderRow = mainTableRef.current.querySelector("thead tr");
      const stickyHeaderRow = stickyTableRef.current.querySelector("thead tr");

      if (mainHeaderRow && stickyHeaderRow) {
        const headerHeight = mainHeaderRow.offsetHeight;
        stickyHeaderRow.style.height = `${headerHeight}px`;
      }

      // Sync body row heights
      mainRows.forEach((row, index) => {
        if (row && stickyRows[index]) {
          // Get the natural heights of both rows
          const mainRowHeight = row.offsetHeight;
          const stickyRowHeight = stickyRows[index].offsetHeight;

          // Use the larger of the two heights
          const maxHeight = Math.max(mainRowHeight, stickyRowHeight);
          row.style.height = `${maxHeight}px`;
          stickyRows[index].style.height = `${maxHeight}px`;
        }
      });
    };

    // Run sync initially and when data changes
    requestAnimationFrame(() => {
      syncRowHeights();
    });

    // Set up resize observer for continuous monitoring
    const resizeObserver = new ResizeObserver(() => {
      syncRowHeights();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", syncRowHeights);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      window.removeEventListener("resize", syncRowHeights);
    };
  }, [displayData, rightStickyColumns, loading]);

  // Check if can scroll left/right and handle scroll events
  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      // Can scroll left if scrolled at least 1px
      setCanScrollLeft(scrollLeft > 0);

      // Can scroll right if there's more content to scroll to
      // Adding a small buffer (1px) to account for rounding errors
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);

      // Shadow effect
      setHasScrolled(scrollLeft > 0);
    }
  };

  // Handle scroll events
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Initial check
      checkScrollability();

      // Set up event listener
      scrollContainerRef.current.addEventListener("scroll", checkScrollability);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener(
          "scroll",
          checkScrollability
        );
      }
    };
  }, []);

  // Navigation handlers
  const scrollLeft = () => {
    if (scrollContainerRef.current && canScrollLeft) {
      // Scroll left by a reasonable amount (e.g., 200px)
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && canScrollRight) {
      // Scroll right by a reasonable amount (e.g., 200px)
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="w-full relative">
      {/* Main scrollable table container */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto"
        style={{ paddingRight: `${stickyColumnsWidth}px` }} // Important: Make space for sticky columns
      >
        <table
          ref={mainTableRef}
          className="w-full border-none"
          style={{ minWidth: "100%" }}
        >
          <thead>
            <tr className="bg-white border-b border-[#E0E1EA]">
              {regularHeaders.map((header) => (
                <th
                  key={header.key}
                  className="px-4 py-3 text-left text-[#7D82A4] font-medium whitespace-nowrap"
                >
                  <div className="flex text-[13px] justify-between items-center">
                    {header.label}
                    {header.sortable && (
                      <Image
                        src={chevronDown}
                        width={10}
                        height={10}
                        alt="logo"
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, rowIndex) => {
              return (
                <tr
                  key={row.isShimmer ? `shimmer-${rowIndex}` : rowIndex}
                  className="border-b border-[#E0E1EA] bg-white hover:bg-gray-50"
                >
                  {regularHeaders.map((header) => (
                    <td
                      key={`${rowIndex}-${header.key}`}
                      className="py-2 px-4 text-[12px] whitespace-nowrap overflow-hidden text-ellipsis align-middle"
                    >
                      {row.isShimmer ? (
                        <ShimmerCell
                          width={`${Math.floor(50 + Math.random() * 100)}px`}
                        />
                      ) : (
                        <span
                          className={
                            header.key === "status"
                              ? "text-green-500"
                              : "text-[#323A70]"
                          }
                        >
                          {row[header?.key]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Sticky right columns with navigation controls */}
      <div
        className={`absolute top-0 right-0 h-full bg-white border-l border-[#E0E1EA] ${
          hasScrolled ? "shadow-md" : ""
        }`}
        style={{ width: `${stickyColumnsWidth}px` }}
      >
        <div className="h-full">
          <table ref={stickyTableRef} className="w-full h-full border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#E0E1EA]">
                {/* Navigation arrows in header */}
                <th colSpan={maxStickyColumnsLength} className="py-2 px-2">
                  <div className="flex justify-end items-center">
                    {/* Left arrow */}
                    <button
                      onClick={scrollLeft}
                      disabled={!canScrollLeft}
                      className={`p-1 rounded cursor-pointer ${
                        canScrollLeft
                          ? "text-[#323A70] hover:bg-gray-100"
                          : "text-gray-300 cursor-not-allowed"
                      }`}
                      aria-label="Scroll left"
                    >
                      <ChevronRight
                        className="rotate-180"
                        color={canScrollLeft ? "" : "#B4B7CB"}
                      />
                    </button>

                    {/* Right arrow */}
                    <button
                      onClick={scrollRight}
                      disabled={!canScrollRight}
                      className={`p-1 rounded cursor-pointer ${
                        canScrollRight
                          ? "text-[#323A70] hover:bg-gray-100"
                          : "text-gray-300 cursor-not-allowed"
                      }`}
                      aria-label="Scroll right"
                    >
                      <ChevronRight color={canScrollRight ? "" : "#B4B7CB"} />
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, rowIndex) => {
                // Get the row-specific sticky columns, or empty array if not defined
                const rowStickyColumns =
                  !loading && rightStickyColumns[rowIndex]
                    ? rightStickyColumns[rowIndex]
                    : [];

                return (
                  <tr
                    key={
                      row.isShimmer ? `shimmer-sticky-${rowIndex}` : rowIndex
                    }
                    className="border-b border-[#E0E1EA] bg-white hover:bg-gray-50"
                  >
                    {/* Render shimmer for loading state or actual content */}
                    {row.isShimmer ? (
                      // Render shimmer cells for the maximum possible number of sticky columns
                      Array(maxStickyColumnsLength)
                        .fill(0)
                        .map((_, colIndex) => (
                          <td
                            key={`shimmer-${rowIndex}-${colIndex}`}
                            className="py-2 text-sm align-middle text-center"
                          >
                            <div className="flex justify-center">
                              <div className="w-8 h-8">
                                <ShimmerCell width="32px" />
                              </div>
                            </div>
                          </td>
                        ))
                    ) : (
                      // Render actual sticky columns
                      <>
                        {rowStickyColumns.map((column, colIndex) => (
                          <td
                            key={`${rowIndex}-${colIndex}`}
                            className={`py-2 text-sm align-middle text-center ${
                              column?.className || ""
                            }`}
                          >
                            <div className="flex justify-center">
                              {column?.icon && column.tooltipText ? (
                                <TooltipWrapper
                                  text={
                                    column.tooltipText ||
                                    `${column.key} information`
                                  }
                                  position={column.tooltipPosition || "top"}
                                  tooltipKey={`${rowIndex}-${column.key}`}
                                  activeKey={activeTooltipKey}
                                  setActiveKey={setActiveTooltipKey}
                                >
                                  <div className="cursor-pointer">
                                    {column.icon}
                                  </div>
                                </TooltipWrapper>
                              ) : (
                                <div className="cursor-pointer">
                                  {column.icon}
                                </div>
                              )}
                              {column?.cta && <button>{column?.cta}</button>}
                            </div>
                          </td>
                        ))}

                        {/* Add empty cells to maintain column count if this row has fewer sticky columns */}
                        {Array.from({
                          length: Math.max(
                            0,
                            maxStickyColumnsLength - rowStickyColumns.length
                          ),
                        }).map((_, i) => (
                          <td
                            key={`${rowIndex}-empty-${i}`}
                            className="py-2 text-sm"
                          ></td>
                        ))}
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StickyDataTable;
