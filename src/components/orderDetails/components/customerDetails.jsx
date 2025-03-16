import React from "react";
import DisplayValues from "./displayValues";

const CustomerDetails = ({ customerEmail, customerName }) => {
  return (
    <div className="border-[1px] border-[#E0E1EA] h-full rounded-md">
      <p className="px-[16px] py-[12px] text-[16px] font-semibold text-[#323A70] border-b-[1px] border-[#E0E1EA]">
        Customer Details
      </p>
      <div className="p-4 grid grid-cols-2 gap-4">
        <DisplayValues
          text={"Customer Name"}
          copyKeys={true}
          value={customerName}
        />
        <DisplayValues
          text={"Customer Email"}
          copyKeys={true}
          value={customerEmail}
        />
      </div>
    </div>
  );
};

export default CustomerDetails;
