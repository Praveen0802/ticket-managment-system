import React, { Fragment } from "react";
import DisplayValues from "./displayValues";

const OrderedTickets = ({ ticket_details }) => {
  const listingObject = [
    { name: "Event Name", text: ticket_details?.match_name },
    { name: "Event Venue", text: ticket_details?.venue_name },
    { name: "Event Date", text: ticket_details?.match_datetime },
    { name: "Seat Details", text: ticket_details?.seat_category },
    {
      values: [
        { name: "Ticket Type", text: ticket_details?.ticket_type },
        { name: "Quantity", text: ticket_details?.quantity },
      ],
      twoKeys: true,
    },
    {
      values: [
        {
          name: "Ticket Price",
          text: `${ticket_details?.sub_total_converted}`,
        },
        {
          name: "Order Value",
          text: `${ticket_details?.total_paid_converted}`,
        },
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
