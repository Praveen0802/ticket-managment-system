import React from "react";

const Benifits = ({ benefits_restrictions, expandedVersion }) => {
  return (
    <div className="border-[1px] border-[#E0E1EA] rounded-md">
      <p className="px-[16px] py-[12px] text-[16px] font-semibold text-[#343432] border-b-[1px] border-[#E0E1EA]">
        Benefits/Restrictions
      </p>
      <ul
        className={`py-4 px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc`}
      >
        {benefits_restrictions?.map((item, index) => {
          return (
            <li className="text-[13px]" key={index}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Benifits;
