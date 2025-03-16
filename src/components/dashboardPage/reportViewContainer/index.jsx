import CustomSelect from "@/components/commonComponents/customSelect";
import Image from "next/image";
import React from "react";
import LeftViewContainer from "./leftViewContainer";
import RightViewContainer from "./rightViewContainer";

const ReportViewContainer = ({ reportValues }) => {
  const { title, options, selectedOption, onChange, reports, tableView } =
    reportValues;
  return (
    <div className="bg-white border-[1px] border-[#eaeaf1] p-[20px] rounded-md flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-semibold">{title}</p>
        <CustomSelect
          selectedValue={selectedOption}
          options={options}
          onSelect={onChange}
          textSize="text-[12px]"
          buttonPadding="px-[10px] py-[4px]"
          dropdownItemPadding="py-1 pl-2 pr-6"
        />
      </div>
      <div className="flex gap-[20px] flex-1">
        <LeftViewContainer reports={reports} />
        <RightViewContainer tableView={tableView} />
      </div>
    </div>
  );
};

export default ReportViewContainer;