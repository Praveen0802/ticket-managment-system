import React from "react";
import Button from "../commonComponents/button";
import botIcon from "../../../public/bot.svg";
import Image from "next/image";

const Header = () => {
  return (
    <div className="px-[24px] h-[80px] bg-white border-b-[1px] flex w-full justify-between items-center border-[#E0E1EA]">
      <p className="text-[24px] font-semibold text-[#323A70]">
        Good Afternoon, Ahmad
      </p>
      <div className="flex gap-3 items-center">
        <Button
          type="secondary"
          label={"Request Event"}
          classNames={{
            root: "border-[1px] border-[#0137D5] py-[11px] px-[14px]",
            label_: "text-[14px] font-medium",
          }}
        />
        <Image src={botIcon} width={48} height={48} alt="boticon" />
      </div>
    </div>
  );
};

export default Header;
