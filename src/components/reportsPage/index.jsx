import React, { useState } from "react";
import ukFlag from "../../../public/uk.svg";
import usFlag from "../../../public/us.svg";
import euFalg from "../../../public/eu.svg";
import Flag from "../../../public/flag.svg";

import Image from "next/image";
import ViewComponent from "./components/viewComponent";

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

  const tabValues = [
    { key: "Transactions", value: "transaction" },
    { key: "Wallet History", value: "wallet" },
  ];

  const [selectedTab, setSelectedTab] = useState("transaction");
  return (
    <div className="bg-[#F5F7FA] w-full h-full">
      <div className="bg-white px-[24px] py-[20px] ">
        <div className="grid grid-cols-4 gap-4">
          {values?.map((item, index) => {
            return <ViewComponent key={index} item={item} />;
          })}
        </div>
      </div>
      <div className="p-4">
        <div className="bg-white">
          <div className="flex items-center gap-4 px-4 pt-4 border-b-[1px] border-[#eaeaf1]">
            {tabValues?.map((item, index) => {
              return (
                <p
                  key={index}
                  onClick={() => setSelectedTab(item?.value)}
                  className={`${
                    selectedTab == item?.value
                      ? "text-[#0137D5] border-b-[1px] border-[#0137D5]"
                      : "text-[#7D82A4]"
                  } text-[16px] font-medium pb-2 cursor-pointer`}
                >
                  {item?.key}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
