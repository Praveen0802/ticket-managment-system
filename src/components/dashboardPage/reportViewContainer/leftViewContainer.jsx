import Image from "next/image";
import React from "react";

const LeftViewContainer = (props) => {
  const { reports } = props;
  return (
    <div className="p-4 flex w-[50%] flex-col justify-around border-[1px] border-[#eaeaf1] rounded-md">
      {reports?.map((report, reportIndex) => {
        return (
          <div key={reportIndex} className="flex justify-between items-center">
            <div className="flex gap-[12px] items-center">
              <div className="bg-[#F2F5FD] p-[8px] rounded-[4px]">
                <Image
                  src={report?.image}
                  width={18}
                  height={18}
                  alt="image-logo"
                />
              </div>
              <p className="text-[#323A70] text-[14px] font-normal">
                {report?.text}
              </p>
            </div>
            <p className="text-[#323A70] text-[16px] font-semibold">
              {report?.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default LeftViewContainer;
