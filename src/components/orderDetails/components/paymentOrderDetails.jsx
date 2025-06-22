import React from "react";

const PaymentOrderDetails = ({ payment_details }) => {
  const listTotalView = [
    
    {
      key: "Ticket Price",
      value: payment_details?.ticket_price,
    },
    {
      key: "Subtotal",
      value: payment_details?.sub_total,
    },
    {
      key: "Service Fee",
      value: payment_details?.service_fee || "0.00",
    },
    {
      key: "Shipping",
      value: payment_details?.shipping || "0.00",
    },
    {
      key: "Tax",
      value: payment_details?.tax || "0.00",
    },
    {
      key: "Total",
      value: payment_details?.total,
    },
  ];


  return (
    <div className="border-[1px] border-[#E0E1EA] h-full rounded-md">
      <p className="px-[16px] py-[12px] text-[16px] font-semibold text-[#343432] border-b-[1px] border-[#E0E1EA]">
        Payment Details
      </p>
      <div className="p-4 flex flex-col gap-4">
        {listTotalView?.map((item, index) => {
          return (
            <div key={index} className="flex gap-4 items-center">
              <p className="text-[13px] w-[20%] font-normal text-gray-700">
                {item?.key}
              </p>
              <div
                className={`${"bg-gray-300"}  flex items-center rounded-md w-[80%]`}
              >
                {item?.value && (
                  <p className="text-[13px] py-1 px-3">{item?.value}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentOrderDetails;
