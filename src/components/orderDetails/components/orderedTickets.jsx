import React, { Fragment } from "react";
import DisplayValues from "./displayValues";

const OrderedTickets = ({ testingValues }) => {
  const {
    eventName,
    venue,
    eventDate,
    seatDetails,
    ticketType,
    quantity,
    price,
    orderValue,
  } = testingValues;

  const listingObject = [
    { name: "Event Name", text: eventName },
    { name: "Event Venue", text: venue },
    { name: "Event Date", text: eventDate },
    { name: "Seat Details", text: seatDetails },
    {
      values: [
        { name: "Ticket Type", text: ticketType },
        { name: "Quantity", text: quantity },
      ],
      twoKeys: true,
    },
    {
      values: [
        { name: "Ticket Price", text: price },
        { name: "Order Value", text: orderValue },
      ],
      twoKeys: true,
    },
  ];

  return (
    <div className="border-[1px] border-[#E0E1EA] rounded-md">
      <p className="px-[16px] py-[12px] text-[16px] font-semibold text-[#323A70] border-b-[1px] border-[#E0E1EA]">
        Tickets Ordered
      </p>
      <div className="grid grid-cols-2 gap-4 p-4">
        {listingObject?.map((item, index) => {
          return (
            <Fragment key={index}>
              {item?.twoKeys ? (
                <div className="grid grid-cols-2 gap-4">
                  {item?.values?.map((item, index) => {
                    return (
                      <DisplayValues
                        key={index}
                        text={item?.name}
                        value={item?.text}
                      />
                    );
                  })}
                </div>
              ) : (
                <DisplayValues text={item?.name} value={item?.text} />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderedTickets;
