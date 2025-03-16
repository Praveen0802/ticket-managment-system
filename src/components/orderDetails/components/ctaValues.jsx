import Button from "@/components/commonComponents/button";
import React from "react";

const CtaValues = ({ ctaText }) => {
  return (
    <div className="flex justify-between gap-4 items-center">
      {ctaText?.map((item, index) => {
        return (
          <div
            key={index}
            className="px-[16px] flex border-[1px] border-[#E0E1EA] rounded-md w-[50%] justify-between items-center py-[12px]"
          >
            <p className="text-[16px] font-semibold text-[#323A70]">
              {item?.title}
            </p>
            <Button
              classNames={{
                root: "bg-[#0137D5] px-[8px] py-[5px]",
                label_: "text-[12px] text-white font-medium",
              }}
              label={item?.cta}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CtaValues;
