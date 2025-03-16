import React from "react";

const Benifits = ({ testingValues }) => {
  const { benifits } = testingValues;
  return (
    <div className="border-[1px] border-[#E0E1EA] rounded-md">
      <p className="px-[16px] py-[12px] text-[16px] font-semibold text-[#323A70] border-b-[1px] border-[#E0E1EA]">
        Benefits/Restrictions
      </p>
      <ul className="py-4 px-10 flex flex-col gap-2 list-disc">
        {benifits?.map((item, index) => {
          return <li className="" key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default Benifits;
