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
  fetchBankAccountDetails,
  getDepositDetails,
  getTransactionDetails,
} from "@/utils/apiHandler/request";
import { useDispatch } from "react-redux";
import { updateWalletPopupFlag } from "@/utils/redux/common/action";
import Button from "../commonComponents/button";
import { IconStore } from "@/utils/helperFunctions/iconStore";
import FloatingDateRange from "../commonComponents/dateRangeInput";

const ReportsPage = (props) => {
  const { apiData } = props;
  const { account_data, deposit_history, transaction_history, countriesList } =
    apiData;
  const flagMap = {
    GBP: ukFlag,
    USD: usFlag,
    EUR: euFalg,
    AED: Flag,
  };

  const dispatch = useDispatch();
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [transactionHistory, setTransactionHistory] =
    useState(transaction_history);
  const [depositHistory, setDepositHistory] = useState(deposit_history);

  const [filterValues, setFilterValues] = useState({
    paymentReference: "",
    creditType: "",
    dateRange: "",
  });

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
        currency: item?.currency,
      },
    };
  });

  const [tabSwitchLoader, setTabSwitchLoader] = useState(false);
  const [payOutPopup, setPayOutPopup] = useState({ flag: false, data: "" });
  const [eyeViewPopup, setEyeViewPopup] = useState({ flag: false, data: "" });
  const [isLoading, setIsLoading] = useState(false);
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

  const handleWalletPlusClick = async (item) => {
    const currency = item?.keys?.currency;
    const response = await fetchBankAccountDetails("", "", "GET", "", {
      currency: currency,
    });
    setPayOutPopup({
      flag: true,
      data: response[0],
    });
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

  // Helper function to convert status code to text
  const getStatusText = (statusCode) => {
    switch (statusCode) {
      case 1:
        return "Approved";
      case 2:
        return "Pending";
      case 3:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  const depositData = depositHistory?.map((list) => {
    return {
      title: list?.month,
      headers: [
        "Reference No",
        "Amount",
        "Payment Method",
        "Status",
        "Date",
        "",
      ],
      data: list?.transactions?.map((listItems) => {
        return {
          referenceNo: listItems?.reference_no,
          amount: listItems?.price_with_currency,
          paymentMethod: listItems?.payment_transfer_by,
          status: getStatusText(listItems?.status),
          date: listItems?.created_date_time,
          eye: true,
          id: listItems?.id,
        };
      }),
    };
  });

  const transactionData = transactionHistory?.map((list) => {
    return {
      title: list?.month,
      headers: ["Reference No", "Amount",  "Type", "Date", ""],
      data: list?.transactions?.map((listItems) => {
        return {
          referenceNo: listItems?.reference_no,
          amount: listItems?.price_with_currency,
          paymentMethod: listItems?.credit_debit,
          date: listItems?.created_date_time,
          eye: true,
          id: listItems?.id,
        };
      }),
    };
  });

console.log(transactionHistory,'transactionHistorytransactionHistory')
  const [selectedTab, setSelectedTab] = useState("transaction");

  const filterChange = async (params) => {
    setIsLoading(true);
    const transactionTab = selectedTab == "transaction";
    const response = transactionTab
      ? await getTransactionDetails("", params)
      : await getDepositDetails("", params);
    console.log(response, "responseresponse");
    if (transactionTab) {
      setTransactionHistory(response);
    } else {
      setDepositHistory(response);
    }
    setIsLoading(false);
  };

  // Update these functions in your ReportsPage component

  // State for tracking filter parameters
  const [filterParams, setFilterParams] = useState({});

  const handleDateChange = (range) => {
    setFilterValues({ ...filterValues, dateRange: range });
    let updatedParams = { ...filterParams };
    if (range && range.startDate && range.endDate) {
      updatedParams.start_date = range.startDate;
      updatedParams.end_date = range.endDate;
    } else {
      delete updatedParams.start_date;
      delete updatedParams.end_date;
    }
    setFilterParams(updatedParams);
    filterChange(updatedParams);
  };

  const handleChange = (e, key, type) => {
    const selectType = type === "select";
    const value = selectType ? e : e.target.value;

    setFilterValues({ ...filterValues, [key]: value });

    const paramKeyMap = {
      paymentReference: "reference_no",
      transactionType: "payment_type",
    };

    let updatedParams = { ...filterParams };

    const apiParamKey = paramKeyMap[key] || key;

    if (value) {
      updatedParams[apiParamKey] = value;
    } else {
      delete updatedParams[apiParamKey];
    }

    setFilterParams(updatedParams);

    filterChange(updatedParams);
  };

  return (
    <div className="bg-[#F5F7FA] w-full h-full flex flex-col overflow-hidden">
      {/* Account Balance Section */}
      <div className="bg-white flex border-b-[1px] border-[#eaeaf1] justify-end px-3 flex-shrink-0">
        <div className="flex gap-2 items-center">
          <Button
            type="blueType"
            classNames={{
              root: "px-2 my-[8px] md:px-3 py-1.5 md:py-2",
              label_: "text-xs md:text-sm font-medium",
            }}
            onClick={() => {
              handlePlusClick();
            }}
            label="Add Deposit"
          />
          <button
            onClick={() => setToggleDropDown(!toggleDropDown)}
            className="border-l-[1px] cursor-pointer border-[#eaeaf1] h-full pl-4 pr-2"
          >
            {!toggleDropDown ? (
              <IconStore.chevronDown className="size-4" />
            ) : (
              <IconStore.chevronUp className="size-4" />
            )}
          </button>
        </div>
      </div>
      <div
        className={`bg-white overflow-hidden transition-all duration-300 ease-in-out flex-shrink-0 ${
          toggleDropDown ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-3 md:px-[24px] py-4 md:py-[20px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mobile:grid-cols-1 mobile:gap-3">
            {values?.map((item, index) => (
              <ViewComponent
                key={index}
                onClick={handleWalletPlusClick}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Section - This should be scrollable */}
      <div className="p-3 md:p-4 mobile:p-2 flex-grow overflow-hidden">
        <div className="flex flex-col h-full bg-white overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex items-center gap-3 md:gap-4 px-3 md:px-4 pt-3 md:pt-4 border-b-[1px] border-[#eaeaf1] overflow-x-auto mobile:gap-2 mobile:px-2 flex-shrink-0">
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
          <div className="p-3 md:p-4 mobile:p-2 flex flex-col gap-4 h-full overflow-hidden">
            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full md:w-[40%] mobile:gap-2 flex-shrink-0">
              <FloatingLabelInput
                id="paymentReference"
                name="paymentReference"
                keyValue={"paymentReference"}
                label="Payment Reference"
                className="!py-[6px] !px-[12px] w-full mobile:text-sm"
                value={filterValues?.paymentReference}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <FloatingSelect
                label="Transaction Type"
                options={[
                  { value: "CREDIT", label: "CREDIT" },
                  { value: "DEBIT", label: "DEBIT" },
                ]}
                selectedValue={filterValues?.transactionType}
                keyValue="transactionType"
                onSelect={handleChange}
                paddingClassName="!py-[6px] !px-[12px] w-full md:w-auto mobile:text-sm"
              />
              <FloatingDateRange
                id="transactionDate"
                name="transactionDate"
                keyValue="transactionDate"
                label="Transaction Date"
                className="!py-[6px] !px-[16px] w-full mobile:text-sm"
                onChange={handleDateChange}
              />
            </div>

            {/* Table Section - This is where we need scrolling */}
            <div className="flex-grow h-0 overflow-auto">
              {tabSwitchLoader ? (
                <div className="flex w-full h-full justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <CollapsablePaymentTable
                  sections={
                    selectedTab == "transaction" ? transactionData : depositData
                  }
                  selectedTab={selectedTab}
                  onRowClick={handleEyeClick}
                  isLoading={isLoading}
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
        countriesList={countriesList}
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
