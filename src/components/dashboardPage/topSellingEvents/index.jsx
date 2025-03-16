import CustomSelect from "@/components/commonComponents/customSelect";
import Image from "next/image";
import React from "react";
import calendarIcon from "../../../../public/calendar-03.svg";

const TopSellingEvents = (props) => {
  const { sellingEvents } = props;
  const { secondSelect, firstSelect } = sellingEvents;
  return (
    <div className="bg-white rounded-md border-[1px] border-[#eaeaf1] flex flex-col h-full">
      <div className="flex p-[20px] border-b border-[#F0F0F5] justify-between items-center">
        <h2 className="text-lg font-medium">{sellingEvents.title}</h2>
        <div className="flex gap-2">
          <CustomSelect
            selectedValue={firstSelect?.selectedOption}
            options={firstSelect?.options}
            onSelect={firstSelect?.onChange}
            textSize="text-[12px]"
            buttonPadding="px-[10px] py-[4px]"
            dropdownItemPadding="py-1 pl-2 pr-6"
          />
          <CustomSelect
            selectedValue={secondSelect?.selectedOption}
            options={secondSelect?.options}
            onSelect={secondSelect?.onChange}
            textSize="text-[12px]"
            buttonPadding="px-[10px] py-[4px]"
            dropdownItemPadding="py-1 pl-2 pr-6"
          />
        </div>
      </div>

      {/* Added flex-1 and flex flex-col to ensure proper height distribution */}
      <div className="flex flex-col ">
        <div className="overflow-auto">
          <table className="min-w-full h-full">
            <thead>
              <tr className="border-b border-gray-200">
                {sellingEvents.tableViews.title.map((title, index) => (
                  <th
                    key={index}
                    className="text-left py-3 px-4 font-medium text-[12px] text-gray-600"
                  >
                    {title}
                  </th>
                ))}
                <th className="w-32"></th>
              </tr>
            </thead>
            <tbody className="h-full">
              {sellingEvents.tableViews.body.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-[12px]">{row.eventName}</td>
                  <td className="py-3 px-4 text-[12px] flex items-center gap-2">
                    <Image
                      src={calendarIcon}
                      width={16}
                      height={16}
                      alt="calendar icon"
                    />
                    <span>{row.eventDate}</span>
                  </td>
                  <td className="py-2 px-4 text-right">
                    <button className="bg-[#0137D5] text-white py-1 px-2 rounded-md text-[12px] hover:bg-[#0137D5] transition-colors">
                      {row.ctaName}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopSellingEvents;