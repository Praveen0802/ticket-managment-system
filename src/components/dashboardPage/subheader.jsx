import Image from "next/image";
import Button from "../commonComponents/button";
import calendarIcon from "../../../public/calendar-03.svg";
import { formatDate } from "@/utils/helperFunctions";

const Subheader = () => {
  return (
    <div className="bg-white flex items-center py-[8px] justify-between px-[24px] border-[1px] border-[#eaeaf1]">
      <div className="flex gap-2 items-center">
        <Image src={calendarIcon} width={16} height={16} alt="logo" />
        <p className="text-[#323A70] text-[14px]">{formatDate(new Date())}</p>
      </div>
      <Button
        type="blueType"
        classNames={{
          root: "px-[10px] py-[8px]",
          label_: "text-[14px] font-medium",
        }}
        label="Add Inventory"
      />
    </div>
  );
};

export default Subheader;
