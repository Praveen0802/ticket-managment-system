import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState } from "react";
import Button from "../commonComponents/button";
import { convertSnakeCaseToCamelCase } from "@/utils/helperFunctions";
import OrderValues from "./components/orderValues";
import CustomerDetails from "./components/customerDetails";
import OrderedTickets from "./components/orderedTickets";
import Benifits from "./components/benifits";
import CustomModal from "../commonComponents/customModal";
import CtaValues from "./components/ctaValues";

const OrderDetails = ({ testingValues }) => {
  const [expandedVersion, setExpandedVersion] = useState(false);
  const ctaText = [
    { title: "Order Notes", cta: "+ Add Note" },
    { title: "Additional File", cta: "Download File" },
  ];
  const {
    orderId,
    date,
    status,
    customerName,
    customerEmail,
    deliverdBy,
    daysToevent,
    expectedPayoutDate,
  } = testingValues;

  const orderObject = {
    order_id: orderId,
    order_date: date,
    order_status: status,
    delivery_by: deliverdBy,
    days_to_event: daysToevent,
    expected_payout_date: expectedPayoutDate,
  };

  const handleCollapseModal = () => {
    setExpandedVersion(!expandedVersion);
  };

  return (
    <CustomModal className={expandedVersion ? "w-full" : ""} show={true}>
      <div className={`${expandedVersion ? "w-full h-full" : "m-4"}`}>
        <div
          className={`${
            expandedVersion ? "w-full h-full" : "max-w-[676px] max-h-[90vh]"
          }  overflow-auto rounded-md bg-white`}
        >
          <div className="flex items-center  border-b-[1px] border-[#E0E1EA] justify-between py-[13px] px-[24px]">
            <p className="text-[18px] text-[#323A70] ">Order ID: {orderId}</p>
            <div className="flex items-center gap-2">
              {expandedVersion ? (
                <IconStore.collapse
                  onClick={handleCollapseModal}
                  className="size-4 cursor-pointer stroke-[#130061]"
                />
              ) : (
                <IconStore.expand
                  onClick={handleCollapseModal}
                  className="size-4 cursor-pointer stroke-[#130061]"
                />
              )}{" "}
              <IconStore.close className="size-4 cursor-pointer stroke-[#130061]" />
            </div>
          </div>
          <div className="p-[24px] flex flex-col gap-4">
            <CtaValues ctaText={ctaText} />
            <div className={`flex ${expandedVersion ? "" : "flex-col "} gap-4`}>
              <div className={`${expandedVersion ? "w-1/2" : "w-full"}`}>
                <OrderValues orderObject={orderObject} />
              </div>
              <div className={`${expandedVersion ? "w-1/2 h-full" : "w-full"}`}>
                <CustomerDetails
                  customerEmail={customerEmail}
                  customerName={customerName}
                />
              </div>
            </div>
            <OrderedTickets testingValues={testingValues} />
            <Benifits testingValues={testingValues} />
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default OrderDetails;
