import React, { useState } from "react";
import ukFlag from "../../../public/uk.svg";
import usFlag from "../../../public/us.svg";
import euFalg from "../../../public/eu.svg";
import Flag from "../../../public/flag.svg";

import ViewComponent from "./components/viewComponent";
import CollapsablePaymentTable from "../collapsablePaymentTable";
import FloatingLabelInput from "../floatinginputFields";
import FloatingSelect from "../floatinginputFields/floatingSelect";
import Spinner from "../commonComponents/spinner";
import AddPayOutPopup from "./components/addPayOutPopup";
import OrderDetails from "../orderDetails";

const ReportsPage = () => {
  const values = [
    {
      icon: ukFlag,
      amount: "£50",
      balance: "Available Balance",
      keys: {
        onHold: "£0.00",
        pendingDelivery: "£5.00",
        pendingPayment: "£0.00",
        total: "£5.00",
      },
    },
    {
      icon: usFlag,
      amount: "£50",
      balance: "Available Balance",
      keys: {
        onHold: "£0.00",
        pendingDelivery: "£5.00",
        pendingPayment: "£0.00",
        total: "£5.00",
      },
    },
    {
      icon: euFalg,
      amount: "£50",
      balance: "Available Balance",
      keys: {
        onHold: "£0.00",
        pendingDelivery: "£5.00",
        pendingPayment: "£0.00",
        total: "£5.00",
      },
    },
    {
      icon: Flag,
      amount: "£50",
      balance: "Available Balance",
      keys: {
        onHold: "£0.00",
        pendingDelivery: "£5.00",
        pendingPayment: "£0.00",
        total: "£5.00",
      },
    },
  ];

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

  const [tabSwitchLoader, setTabSwitchLoader] = useState(false);
  const [payOutPopup, setPayOutPopup] = useState({ flag: false, data: "" });
  const [eyeViewPopup, setEyeViewPopup] = useState({ flag: false, data: "" });
  const tabValues = [
    { key: "Transactions", value: "transaction" },
    { key: "Wallet History", value: "wallet" },
  ];

  const handleSelectTab = (value) => {
    setTabSwitchLoader(true);
    setTimeout(() => {
      setTabSwitchLoader(false);
    }, 1000);
    setSelectedTab(value);
  };

  const handlePlusClick = (item) => {
    setPayOutPopup({ flag: true, data: item });
  };

  const handleEyeClick = (item) => {
    setEyeViewPopup({ flag: true, data: testingValues });
  };

  const paymentSections = [
    {
      title: "April 2024",
      headers: [
        "Payment Reference",
        "To Account",
        "Amount",
        "Initiated Date",
        "Expected Date",
        "Status",
      ],
      data: [
        {
          reference: "PAYREF1",
          account: "GB68SAPY6083829656452",
          amount: "£3,500",
          initiatedDate: "Nov 18, 2024",
          expectedDate: "Nov 23, 2024",
          status: "Sent",
        },
        {
          reference: "PAYREF2",
          account: "GB68SAPY6083829656452",
          amount: "£3,500",
          initiatedDate: "Nov 15, 2024",
          expectedDate: "Nov 20, 2024",
          status: "Approved",
        },
        {
          reference: "PAYREF3",
          account: "GB68SAPY6083829656452",
          amount: "£3,500",
          initiatedDate: "Nov 10, 2024",
          expectedDate: "Nov 15, 2024",
          status: "Sent",
        },
      ],
    },
    {
      title: "March 2024",
      headers: [
        "Payment Reference",
        "To Account",
        "Amount",
        "Initiated Date",
        "Expected Date",
        "Status",
      ],
      data: [
        {
          reference: "PAYREF4",
          account: "GB68SAPY6083829656452",
          amount: "£3,500",
          initiatedDate: "Oct 18, 2024",
          expectedDate: "Oct 23, 2024",
          status: "Sent",
        },
      ],
    },
  ];

  const walletHistory = [
    {
      title: "April 2024",
      headers: [
        "Order ID",
        "Payment Reference",
        "Event",
        "Net Amount",
        "Deductions",
        "Payout Value",
        "Payout Initiated Date",
        "Ticket",
        "Status",
        "",
      ],
      data: [
        {
          orderId: "18016559658735 ",
          reference: "PAYREF1",
          event: "180165596587377 ",
          netAmount: "£100",
          deductions: "£10",
          payoutValue: "£90",
          payoutDate: "Apr 7, 2024",
          ticket: "1 × Shortside",
          status: "Paid",
          eye: true,
        },
      ],
    },
  ];

  const [paymentReference, setPaymentReference] = useState("");

  const [selectedTab, setSelectedTab] = useState("transaction");
  return (
    <div className="bg-[#F5F7FA] w-full h-full max-md:overflow-auto">
      <div className="bg-white px-3 md:px-[24px] py-4 md:py-[20px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {values?.map((item, index) => {
            return (
              <ViewComponent
                key={index}
                onClick={handlePlusClick}
                item={item}
              />
            );
          })}
        </div>
      </div>
      <div className="p-3 md:p-4">
        <div className="flex flex-col gap-4 bg-white">
          <div className="flex items-center gap-3 md:gap-4 px-3 md:px-4 pt-3 md:pt-4 border-b-[1px] border-[#eaeaf1] overflow-x-auto">
            {tabValues?.map((item, index) => {
              return (
                <p
                  key={index}
                  onClick={() => handleSelectTab(item?.value)}
                  className={`${
                    selectedTab == item?.value
                      ? "text-[#0137D5] border-b-[1px] border-[#0137D5]"
                      : "text-[#7D82A4]"
                  } text-[14px] md:text-[16px] font-medium pb-2 cursor-pointer whitespace-nowrap`}
                >
                  {item?.key}
                </p>
              );
            })}
          </div>

          <div className="p-3 md:p-4 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-[40%]">
              <FloatingLabelInput
                id="paymentReference"
                name="paymentReference"
                label="Search by Payment Refrence"
                className="!py-[6px] !px-[12px] w-full"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                autoComplete="off"
                required
              />
              <FloatingSelect
                label="Country"
                options={[
                  { value: "us", label: "United States" },
                  { value: "ca", label: "Canada" },
                  { value: "mx", label: "Mexico" },
                ]}
                selectedValue="us"
                // onSelect={handleCountryChange}
                paddingClassName="!py-[6px] !px-[12px] w-full md:w-auto" // Wider horizontal padding
              />
            </div>
            <div
              className={
                tabSwitchLoader
                  ? "h-[200px] md:h-[300px] flex w-full justify-center items-center"
                  : "overflow-x-auto"
              }
            >
              {tabSwitchLoader ? (
                <Spinner />
              ) : (
                <CollapsablePaymentTable
                  sections={
                    selectedTab == "transaction"
                      ? paymentSections
                      : walletHistory
                  }
                  onRowClick={handleEyeClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <AddPayOutPopup
        show={payOutPopup?.flag}
        onClose={() => {
          setPayOutPopup({ flag: false, data: "" });
        }}
        item={payOutPopup?.data}
      />
      <OrderDetails
        testingValues={eyeViewPopup?.data}
        show={eyeViewPopup?.flag}
        onClose={() => setEyeViewPopup({ flag: false, data: "" })}
      />
    </div>
  );
};

export default ReportsPage;
