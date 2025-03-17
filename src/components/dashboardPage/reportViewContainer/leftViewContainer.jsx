import Image from "next/image";
import React from "react";

const LeftViewContainer = (props) => {
  const { reports } = props;
  return (
    <div className="p-4 flex w-full md:w-[50%] flex-col justify-around border-[1px] border-[#eaeaf1] rounded-md">
      {reports?.map((report, reportIndex) => {
        return (
          <div
            key={reportIndex}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-0"
          >
            <div className="flex gap-[12px] items-center mb-2 sm:mb-0">
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
            <p className="text-[#323A70] text-[16px] font-semibold ml-10 sm:ml-0">
              {report?.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default LeftViewContainer;
