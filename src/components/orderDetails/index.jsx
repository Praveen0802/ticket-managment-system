import { IconStore } from "@/utils/helperFunctions/iconStore";
import React, { useState, useEffect } from "react";
import Button from "../commonComponents/button";
import { convertSnakeCaseToCamelCase } from "@/utils/helperFunctions";
import OrderValues from "./components/orderValues";
import CustomerDetails from "./components/customerDetails";
import OrderedTickets from "./components/orderedTickets";
import Benifits from "./components/benifits";
import CustomModal from "../commonComponents/customModal";
import CtaValues from "./components/ctaValues";
import AttendeeDetails from "./components/attendeeDetails";

const OrderDetails = ({ show, onClose }) => {
  const testingValues = {
    orderId: "6B1C74A9",
    date: "20/10/2024, 17:36:03",
    status: "Pending",
    deliverdBy: "24/10/2024",
    expectedPayoutDate: "09/11/2024",
    daysToevent: "24",
    customerName: "Customer Name",
    customerEmail: "hassanaliahmed727@gmail.com",
    eventName: "UFC 308 - Ilia Topuria vs d Max Holloway Abu Dhabi",
    venue: "Etihad Arena",
    eventDate: "26/10/2024",
    seatDetails: "Lower 105",
    ticketType: "E-ticket",
    quantity: "2",
    price: "£925.00",
    orderValue: "£925.00",
    benifits: [
      "Includes unlimited food and soft drinks",
      "VIP access 3 hours pre match",
      "Tickets yve you access to a private VIP bar",
      "VIP lounge access 1 hour post match",
      "12 Person Suite",
      "In-Seat Wait Service",
    ],
    billingAddress: "Manchester, GB",
    shippingAddress: "Manchester, GB",
  };

  const [expandedVersion, setExpandedVersion] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    setIsTransitioning(true);
    setExpandedVersion(!expandedVersion);
    // Reset transitioning state after animation completes with a longer duration
    setTimeout(() => setIsTransitioning(false), 600);
  };

  return (
    <>
      <style>{`
        .scale-transition {
          animation: scale-zoom 500ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes scale-zoom {
          0% {
            transform: scale(expandedVersion ? 0.95 : 1);
          }
          70% {
            transform: scale(expandedVersion ? 1.01 : 0.99);
          }
          100% {
            transform: scale(1);
          }
        }

        .transition-custom {
          transition: all 500ms cubic-bezier(0.25, 1, 0.5, 1);
        }
      `}</style>

      <CustomModal
        className={`transition-custom ${expandedVersion ? "w-full" : ""}`}
        show={show}
        onClose={onClose}
      >
        <div
          className={`transition-custom ${
            expandedVersion ? "w-full h-full" : "m-4"
          }`}
        >
          <div
            className={`
              transition-custom overflow-auto rounded-md bg-white
              ${
                expandedVersion ? "w-full h-full" : "max-w-[676px] max-h-[90vh]"
              }
              ${isTransitioning ? "scale-transition" : ""}
            `}
            style={{
              transformOrigin: "center",
            }}
          >
            <div className="flex items-center border-b-[1px] border-[#E0E1EA] justify-between py-[13px] px-[24px]">
              <p className="text-[18px] text-[#323A70]">Order ID: {orderId}</p>
              <div className="flex items-center gap-2 ">
                {expandedVersion ? (
                  <IconStore.collapse
                    onClick={handleCollapseModal}
                    className="size-4 cursor-pointer stroke-[#130061] transition-transform duration-300 hover:scale-110"
                  />
                ) : (
                  <IconStore.expand
                    onClick={handleCollapseModal}
                    className="size-4 cursor-pointer stroke-[#130061] transition-transform duration-300 hover:scale-110"
                  />
                )}
                <IconStore.close
                  onClick={onClose}
                  className="size-4 cursor-pointer stroke-[#130061] transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
            <div className="p-[24px] flex flex-col gap-4">
              <AttendeeDetails />
              <CtaValues ctaText={ctaText} />
              <div
                className={`flex gap-4 transition-custom ${
                  expandedVersion ? "" : "flex-col"
                }`}
              >
                <div
                  className={`transition-custom ${
                    expandedVersion ? "w-1/2" : "w-full"
                  }`}
                >
                  <OrderValues orderObject={orderObject} />
                </div>
                <div
                  className={`transition-custom ${
                    expandedVersion ? "w-1/2 h-full" : "w-full"
                  }`}
                >
                  <CustomerDetails
                    customerEmail={customerEmail}
                    customerName={customerName}
                  />
                </div>
              </div>
              <OrderedTickets testingValues={testingValues} />
              <Benifits
                testingValues={testingValues}
                expandedVersion={expandedVersion}
              />
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default OrderDetails;
