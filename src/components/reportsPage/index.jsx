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
import OrderViewPopup from "./components/orderViewPopup";
import {
  getDepositDetails,
  getTransactionDetails,
} from "@/utils/apiHandler/request";
import { useDispatch } from "react-redux";
import { updateWalletPopupFlag } from "@/utils/redux/common/action";

const ReportsPage = (props) => {
  const { apiData } = props;
  const { account_data, deposit_history, transaction_history } = apiData;
  const flagMap = {
    GBP: ukFlag,
    USD: usFlag,
    EUR: euFalg,
    AED: Flag,
  };

  const dispatch = useDispatch();

  // Convert to the desired format
  const values = account_data?.map((item) => {
    return {
      icon: flagMap[item.currency],
      amount: item.balance_amount,
      balance: "Available Balance",
      keys: {
        pendingDelivery: item?.pending_orders,
        pendingPayment: item?.pending_amount,
        confirmedOrder: item?.confirmed_orders,
      },
    };
  });

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
    dispatch(
      updateWalletPopupFlag({
        flag: true,
      })
    );
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
        "",
      ],
      data: list?.transactions?.map((listItems) => {
        return {
          referenceNo: listItems?.reference_no,
          amount: listItems?.amount,
          currency: listItems?.currency,
          paymentMethod: listItems?.payment_transfer_by,
          date: listItems?.created_date_time,
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
    <div className="bg-[#F5F7FA] w-full h-full max-md:overflow-x-auto">
      {/* Account Balance Section */}
      <div className="bg-white px-3 md:px-[24px] py-4 md:py-[20px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mobile:grid-cols-1 mobile:gap-3">
          {values?.map((item, index) => (
            <ViewComponent key={index} onClick={handlePlusClick} item={item} />
          ))}
        </div>
      </div>

      {/* Transactions Section */}
      <div className="p-3 md:p-4 mobile:p-2">
        <div className="flex flex-col gap-4 bg-white">
          {/* Tab Navigation */}
          <div className="flex items-center gap-3 md:gap-4 px-3 md:px-4 pt-3 md:pt-4 border-b-[1px] border-[#eaeaf1] overflow-x-auto mobile:gap-2 mobile:px-2">
            {tabValues?.map((item, index) => (
              <p
                key={index}
                onClick={() => handleSelectTab(item?.value)}
                className={`${
                  selectedTab == item?.value
                    ? "text-[#0137D5] border-b-[1px] border-[#0137D5]"
                    : "text-[#7D82A4]"
                } text-[14px] md:text-[16px] mobile:text-[12px] font-medium pb-2 cursor-pointer whitespace-nowrap`}
              >
                {item?.key}
              </p>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-3 md:p-4 mobile:p-2 flex flex-col gap-4">
            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-[40%] mobile:gap-2">
              <FloatingLabelInput
                id="paymentReference"
                name="paymentReference"
                keyValue={"paymentReference"}
                label="Search by Payment Reference"
                className="!py-[6px] !px-[12px] w-full mobile:text-sm"
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
                paddingClassName="!py-[6px] !px-[12px] w-full md:w-auto mobile:text-sm"
              />
            </div>

            {/* Table Section */}
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

      {/* Popups */}
      <AddPayOutPopup
        show={payOutPopup?.flag}
        onClose={() => {
          setPayOutPopup({ flag: false, data: "" });
        }}
        item={payOutPopup?.data}
      />
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
