import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState } from "react";
import CustomSelect from "../commonComponents/customSelect";

const MyTeamView = () => {
  const selectOptions = {
    options: [
      { value: "today", label: "Today" },
      { value: "yesterday", label: "Yesterday" },
    ],
    selectedOption: "today",
    onchange: () => {},
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = 1; // This would be calculated based on your data

  const viewOptions = {
    options: [
      { value: "10", label: "10" },
      { value: "20", label: "20" },
      { value: "50", label: "50" },
    ],
    selectedOption: "10",
    onChange: (value) => setItemsPerPage(parseInt(value)),
  };

  const users = [
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

  return (
    <div className="w-full h-full">
      <p className="pb-4 text-[20px] p-4 font-semibold">My Team</p>
      <div className="bg-white p-4 border-[1px] border-[#eaeaf1] w-full h-full">
        <div className="border-[1px] border-[#eaeaf1] rounded-md">
          <div className="p-4 border-b-[1px] border-[#eaeaf1] flex items-center gap-4">
            <div className="border-[1px] flex gap-2 items-center px-1 py-[4px] w-[40%] border-[#eaeaf1] rounded-md">
              <IconStore.search className="size-4" />
              <input
                type="text"
                placeholder="Search"
                className="outline-none placeholder:text-[#130061] text-[14px] text-[#130061] w-full"
              />
            </div>
            <CustomSelect
              selectedValue={selectOptions?.selectedOption}
              options={selectOptions?.options}
              onSelect={selectOptions?.onChange}
              textSize="text-[12px]"
              buttonPadding="px-[10px] py-[4px]"
              dropdownItemPadding="py-1 pl-2 pr-6"
            />
          </div>
          <div className="flex justify-between">
            <p className="p-4 text-[14px] text-[#323A70] border-r-[1px] border-[#eaeaf1] font-medium">
              {users?.length} users
            </p>
           
            <div className="flex border-l-[1px] pl-4 border-[#eaeaf1] items-center text-[#323A70] text-[14px]">
              <div className="flex items-center mr-4">
                <span className="mr-2">View</span>
                <CustomSelect
                  selectedValue={viewOptions.selectedOption}
                  options={viewOptions.options}
                  onSelect={viewOptions.onChange}
                  textSize="text-[12px]"
                  buttonPadding="px-[10px] py-[4px]"
                  dropdownItemPadding="py-1 pl-2 pr-6"
                />
              </div>

              <div className="flex items-center mr-4">
                <span className="mr-2">Page</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) =>
                    setCurrentPage(parseInt(e.target.value) || 1)
                  }
                  className="w-8 h-8 text-center border border-[#eaeaf1] rounded mx-1"
                />
                <span>of {totalPages}</span>
              </div>

              <div className="flex items-center border-l border-[#eaeaf1] pl-4">
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
      </div>
    </div>
  );
};

export default MyTeamView;
