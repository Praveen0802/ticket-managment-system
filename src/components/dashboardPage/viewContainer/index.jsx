import CustomSelect from "@/components/commonComponents/customSelect";
import Image from "next/image";
import React from "react";

const ViewContainer = ({
  title,
  options,
  listValues,
  onChange,
  selectedOption,
}) => {
  return (
    <div className="bg-white border border-[#eaeaf1] flex flex-col gap-3 md:gap-4 w-full rounded-md p-3 md:p-5">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <p className="text-[#323A70] text-sm md:text-base whitespace-nowrap">
          {title}
        </p>
        <CustomSelect
          selectedValue={selectedOption}
          options={options}
          onSelect={onChange}
          textSize="text-xs md:text-sm"
          buttonPadding="px-2 md:px-3 py-1 md:py-1.5"
          dropdownItemPadding="py-1 pl-2 pr-4 md:pr-6"
        />
      </div>
      <div className="p-3 md:p-4 border border-[#eaeaf1] flex flex-col gap-3 rounded-md">
        {listValues?.map((listItem, listIndex) => {
          return (
            <div className="flex items-center justify-between" key={listIndex}>
              <div className="flex gap-2 items-center">
                <div className="bg-[#F2F5FD] p-1.5 md:p-2 rounded-md">
                  <Image
                    src={listItem?.image}
                    width={16}
                    height={16}
                    alt="image"
                    className="w-4 h-4"
                  />
                </div>
                <p className="text-[#323A70] text-xs md:text-sm">
                  {listItem?.text}
                </p>
              </div>
              <p className="text-[#323A70] text-sm md:text-base font-semibold">
                {listItem?.count}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewContainer;
