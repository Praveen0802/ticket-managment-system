import CustomModal from "@/components/commonComponents/customModal";
import OrderDetails from "@/components/orderDetails";
import React from "react";

const Test = () => {
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

  return (
    <div className="">
      <OrderDetails testingValues={testingValues} />
    </div>
  );
};

export default Test;
