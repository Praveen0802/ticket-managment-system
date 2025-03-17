import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState, useEffect } from "react";
import CustomSelect from "../commonComponents/customSelect";
import Button from "../commonComponents/button";
import TableView from "./components/tableView";

const MyTeamView = () => {
  const selectOptions = {
    options: [
      { value: "today", label: "Today" },
      { value: "yesterday", label: "Yesterday" },
    ],
    selectedOption: "today",
    onChange: () => {},
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const viewOptions = {
    options: [
      { value: "10", label: "10" },
      { value: "20", label: "20" },
      { value: "50", label: "50" },
    ],
    selectedOption: "10",
    onChange: (value) => {
      setItemsPerPage(parseInt(value));
      setCurrentPage(1); // Reset to first page when changing items per page
    },
  };

  const users = [
    {
      name: "Amir Khan",
      email: "tradeNumberz@yopmail.com",
      type: "User",
    },
    {
      name: "Amir Khan",
      email: "tradeNumberz@yopmail.com",
      type: "Primary User",
    },
    {
      name: "Amir Khan",
      email: "tradeNumberz@yopmail.com",
      type: "Primary User",
    },
    {
      name: "Amir Khan",
      email: "tradeNumberz@yopmail.com",
      type: "Primary User",
    },
    {
      name: "Amir Khan",
      email: "tradeNumberz@yopmail.com",
      type: "Primary User",
    },
    {
      name: "Amir Khan",
      email: "tradeNumberz@yopmail.com",
      type: "Primary User",
    },
    {
      name: "Amir Khan",
      email: "tradeNumberz@yopmail.com",
      type: "Primary User",
    },
    {
      name: "Amir Khan",
      email: "tradeNumberz@yopmail.com",
      type: "Primary User",
    },
    {
      name: "Amir Khan",
      email: "tradeNumberz@yopmail.com",
      type: "Primary User",
    },
    {
      name: "Amir Khan",
      email: "tradeNumberz@yopmail.com",
      type: "Primary User",
    },
    {
      name: "Amir Khan",
      email: "tradeNumberz@yopmail.com",
      type: "Primary User",
    },
    {
      name: "Amir Khan",
      email: "tradeNumberz@yopmail.com",
      type: "Primary User",
    },
  ];

  // Calculate total pages whenever users array or itemsPerPage changes
  useEffect(() => {
    const calculatedTotalPages = Math.ceil(users.length / itemsPerPage);
    setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);

    // If current page is greater than total pages, reset to total pages
    if (currentPage > calculatedTotalPages) {
      setCurrentPage(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
    }
  }, [users.length, itemsPerPage, currentPage]);

  // Get current users for the current page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageInputChange = (e) => {
    const page = parseInt(e.target.value) || 1;
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(1);
    }
  };

  const headerClassName =
    "px-2 sm:px-4 py-2 border-b border-r border-[#eaeaf1] text-xs sm:text-sm font-medium text-[#323A70]";

  const rowClassName =
    "px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b border-r border-[#eaeaf1]";

  return (
    <div className="w-full h-full">
      <p className="pb-2 sm:pb-4 text-base sm:text-lg md:text-xl p-3 sm:p-4 font-semibold">
        My Team
      </p>
      <div className="bg-white p-3 sm:p-4 border-[1px] flex flex-col gap-3 sm:gap-4 border-[#eaeaf1] w-full h-full">
        <div className="border-[1px] border-[#eaeaf1] rounded-md">
          {/* Search and filter area */}
          <div className="p-3 sm:p-4 border-b-[1px] border-[#eaeaf1] flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="border-[1px] flex gap-2 items-center px-1 py-[4px] w-full sm:w-[40%] border-[#eaeaf1] rounded-md">
              <IconStore.search className="size-4 stroke-[#130061] stroke-4" />
              <input
                type="text"
                placeholder="Search"
                className="outline-none placeholder:text-[#130061] text-xs sm:text-sm text-[#130061] w-full"
              />
            </div>
            <CustomSelect
              selectedValue={selectOptions.selectedOption}
              options={selectOptions.options}
              onSelect={selectOptions.onChange}
              textSize="text-xs sm:text-sm"
              buttonPadding="px-[10px] py-[4px]"
              dropdownItemPadding="py-1 pl-2 pr-6"
            />
          </div>

          {/* User count and pagination controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <p className="p-3 sm:p-4 text-xs sm:text-sm text-[#323A70] border-b-[1px] sm:border-b-0 sm:border-r-[1px] border-[#eaeaf1] font-medium w-full sm:w-auto">
              {users.length} users
            </p>

            <div className="flex flex-wrap sm:flex-nowrap justify-between w-full sm:w-auto border-t-[1px] sm:border-t-0 sm:border-l-[1px] p-3 sm:pl-4 border-[#eaeaf1] items-center text-[#323A70] text-xs sm:text-sm">
              <div className="flex items-center mb-2 sm:mb-0 mr-0 sm:mr-4">
                <span className="mr-2">View</span>
                <CustomSelect
                  selectedValue={viewOptions.selectedOption}
                  options={viewOptions.options}
                  onSelect={viewOptions.onChange}
                  textSize="text-xs sm:text-sm"
                  buttonPadding="px-[10px] py-[4px]"
                  dropdownItemPadding="py-1 pl-2 pr-6"
                />
              </div>

              <div className="flex items-center mb-2 sm:mb-0 mr-0 sm:mr-4">
                <span className="mr-2">Page</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={handlePageInputChange}
                  className="w-8 h-8 text-center border border-[#eaeaf1] rounded mx-1"
                />
                <span>of {totalPages}</span>
              </div>

              <div className="flex items-center sm:border-l border-[#eaeaf1] sm:pl-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-1 ${
                    currentPage === 1 ? "text-gray-300" : "hover:bg-gray-100"
                  }`}
                >
                  <IconStore.chevronLeft />
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-1 ${
                    currentPage === totalPages
                      ? "text-gray-300"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <IconStore.chevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4">
          <TableView
            headerClassName={headerClassName}
            rowClassName={rowClassName}
            currentUsers={currentUsers}
          />
          <Button
            label="Invite User"
            classNames={{
              root: "bg-[#130061] text-white w-fit px-4 py-2 text-xs sm:text-sm",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyTeamView;
