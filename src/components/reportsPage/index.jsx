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
import WalletHistory from "./components/walletHistory";
import TransactionHistory from "./components/transactionHistory";
import OrderViewPopup from "./components/orderViewPopup";
import {
  getDepositDetails,
  getTransactionDetails,
} from "@/utils/apiHandler/request";

const ReportsPage = (props) => {
  const { apiData } = props;
  const { account_data, deposit_history, transaction_history } = apiData;
  const flagMap = {
    GBP: ukFlag,
    USD: usFlag,
    EUR: euFalg,
    AED: Flag,
  };

  // Convert to the desired format
  const values = account_data?.map((item) => {
    return {
      icon: flagMap[item.currency],
      amount: item.balance_amount,
      balance: "Available Balance",
      keys: {
        // onHold: "£0.00",
        pendingDelivery: item?.pending_orders,
        pendingPayment: item?.pending_amount,
        confirmedOrder: item?.confirmed_orders,
      },
    };
  });

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

  const handleEyeClick = async (item, transactionType) => {
    const payload = { id: item?.id };
    const response =
      transactionType == "transaction"
        ? await getTransactionDetails("", payload)
        : await getDepositDetails("", payload);
    setEyeViewPopup({
      flag: true,
      data: { ...response, transactionType: transactionType },
    });
  };

  const depositData = deposit_history?.map((list) => {
    return {
      title: list?.month,
      headers: [
        "Reference No",
        "Amount",
        "Currency",
        "Payment Method",
        "Date",
        // "Notes",
        "",
      ],
      data: list?.transactions?.map((listItems) => {
        return {
          referenceNo: listItems?.reference_no,
          amount: listItems?.amount,
          currency: listItems?.currency,
          paymentMethod: listItems?.payment_transfer_by,
          date: listItems?.created_date_time,
          // notes: listItems?.noted ?? "-",
          eye: true,
          id: listItems?.id,
        };
      }),
    };
  });

  const transactionData = transaction_history?.map((list) => {
    return {
      title: list?.month,
      headers: ["Reference No", "Amount", "Currency", "Type", "Date", ""],
      data: list?.transactions?.map((listItems) => {
        return {
          referenceNo: listItems?.reference_no,
          amount: listItems?.amount,
          currency: listItems?.currency,
          paymentMethod: listItems?.credit_debit,
          date: listItems?.created_date_time,
          eye: true,
          id: listItems?.id,
        };
      }),
    };
  });

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
                keyValue={"paymentReference"}
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
                // <>
                //   {selectedTab == "transaction" ? (
                //     <TransactionHistory
                //       transactions={transaction_history}
                //       onRowClick={handleEyeClick}
                //     />
                //   ) : (
                //     <WalletHistory
                //       transactions={deposit_history}
                //       onRowClick={handleEyeClick}
                //     />
                //   )}
                // </>
                <CollapsablePaymentTable
                  sections={
                    selectedTab == "transaction" ? transactionData : depositData
                  }
                  selectedTab={selectedTab}
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
      {/* <OrderDetails
        testingValues={eyeViewPopup?.data}
        show={eyeViewPopup?.flag}
        onClose={() => setEyeViewPopup({ flag: false, data: "" })}
      /> */}
      <OrderViewPopup
        show={eyeViewPopup?.flag}
        onClose={() => setEyeViewPopup({ flag: false, data: "" })}
        data={eyeViewPopup?.data}
        outSideClickClose={false}
      />
    </div>
  );
};

export default ReportsPage;
