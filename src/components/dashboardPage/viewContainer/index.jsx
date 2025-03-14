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
    <div className="bg-white border-[1px] flex flex-col gap-[16px] w-[310px] border-[#E0E1EA] rounded-md p-[20px]">
      <div className="flex justify-between  items-center">
        <p className="text-[#323A70] text-[14px] whitespace-nowrap">{title}</p>
        <CustomSelect
          selectedValue={selectedOption}
          options={options}
          onSelect={onChange}
          textSize="text-[12px]"
          buttonPadding="px-[10px] py-[4px]"
          dropdownItemPadding="py-1 pl-2 pr-6"
        />
      </div>
      <div className="p-4 border-[1px] border-[#E0E1EA] flex flex-col gap-[12px] rounded-md">
        {listValues?.map((listItem, listIndex) => {
          return (
            <div className="flex items-center justify-between" key={listIndex}>
              <div className="flex gap-2 items-center">
                <div className="bg-[#F2F5FD] p-[8px] rounded-md">
                  <Image
                    src={listItem?.image}
                    width={18}
                    height={18}
                    alt="image"
                  />
                </div>
                <p className="text-[#323A70] text-[14px]">{listItem?.text}</p>
              </div>
              <p className="text-[#323A70] text-[16px] font-semibold">
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
