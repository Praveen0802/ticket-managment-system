import React from "react";

const PurchaseCard = ({ data }) => {
  const listTotalView = [
    { key: "Quantity", value: data?.quantity },
    {
      key: "Ticket Price",
      value: data?.ticket_price,
      symbol: data?.currency_symbol,
    },
    {
      key: "Subtotal",
      value: data?.ticket_price,
      symbol: data?.currency_symbol,
    },
    {
      key: "Service Fee",
      value: data?.serviceFee || "0.00",
      symbol: data?.currency_symbol,
    },
    {
      key: "Shipping",
      value: data?.shipping || "0.00",
      symbol: data?.currency_symbol,
    },
    { key: "Tax", value: data?.tax || "0.00", symbol: data?.currency_symbol },
    {
      key: "Total",
      value: calculateTotal(data),
      symbol: data?.currency_symbol,
    },
  ];

  function calculateTotal(data) {
    const subtotal =
      Number(data?.quantity || 0) * Number(data?.ticket_price || 0);
    const serviceFee = Number(data?.serviceFee || 0);
    const shipping = Number(data?.shipping || 0);
    const tax = Number(data?.tax || 0);
    const total = subtotal + serviceFee + shipping + tax;
    return total.toFixed(2);
  }

  return (
    <div className="border border-gray-200 rounded-md">
      <p className="px-4 py-2 border-b border-gray-200 text-[14px] font-medium">
        Review Purchase
      </p>
      <div className="p-4 flex flex-col gap-4">
        {listTotalView?.map((item, index) => {
          return (
            <div key={index} className="flex gap-4 items-center">
              <p className="text-[13px] w-[20%] font-normal text-gray-700">
                {item?.key}
              </p>
              <div className="bg-gray-300 flex items-center rounded-md w-[80%]">
                {item?.symbol && (
                  <p className="p-1 text-[13px] border-r-[0.5px] border-white">
                    {item?.symbol}
                  </p>
                )}
                <p className="text-[13px] py-1 px-3">{item?.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PurchaseCard;
