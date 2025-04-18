import { dateFormat, desiredFormatDate } from "@/utils/helperFunctions";
import { IconStore } from "@/utils/helperFunctions/iconStore";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FooterButton from "../footerButton";
import Button from "../commonComponents/button";
import PurchaseCard from "./purchaseCard";
import EventDetails from "./eventDetails";
import PaymentDetails from "./paymentDetails";
import AddessDetails from "./addessDetails";
import {
  fetchAddressBookDetails,
  paymentPurchaseDetails,
} from "@/utils/apiHandler/request";

const ConfirmPurchasePopup = ({ onClose }) => {
  const { confirmPurchasePopupFields } = useSelector((state) => state?.common);
  const [loader, setLoader] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("LMT Pay");
  const [addressDetails, setAddressDetails] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const { data = {} } = confirmPurchasePopupFields;
  const handlePaymentChange = (name) => {
    setSelectedPayment(name);
  };

  const handleAddressChange = (id) => {
    setSelectedAddress(id);
  };

  const fetchAddressPaymentDetails = async () => {
    const [addressDetails, paymentDetails] = await Promise.all([
      fetchAddressBookDetails(),
      paymentPurchaseDetails("", {
        currency: data?.purchase?.price_breakdown?.currency,
      }),
    ]);
    setAddressDetails(addressDetails);
    setPaymentDetails(paymentDetails?.payment_methods);
    console.log(addressDetails, paymentDetails, "paymentDetailspaymentDetails");
  };

  useEffect(() => {
    fetchAddressPaymentDetails();
  }, []);

  const handleSubmit = async () => {};

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-[15px] font-semibold text-gray-800">
          Confirm Purchase
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-200"
          aria-label="Close"
        >
          <IconStore.close className="size-5 text-gray-600" />
        </button>
      </div>

      {/* Content - Scrollable Area */}
      <div className="flex-grow overflow-y-auto px-4 py-4 space-y-4">
        <EventDetails data={data} />
        <PurchaseCard data={data} />
        <AddessDetails
          data={data}
          addressDetails={addressDetails}
          selectedAddress={selectedAddress}
          handleAddressChange={handleAddressChange}
        />
        <PaymentDetails
          data={data}
          selectedPayment={selectedPayment}
          handlePaymentChange={handlePaymentChange}
          paymentDetails={paymentDetails}
        />
      </div>

      {/* Footer - Fixed at Bottom */}
      <div className="flex-shrink-0 w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border-t border-gray-200 mt-auto">
        <div className="flex justify-start gap-3 sm:gap-4">
          <Button
            label="Cancel"
            type="secondary"
            onClick={onClose}
            classNames={{
              root: "py-2 px-3 sm:px-4 bg-white hover:bg-gray-50 w-[50%] justify-center rounded-md transition-all duration-200",
              label_: "text-sm font-medium text-gray-800",
            }}
          />
          <Button
            label="Submit"
            loading={loader}
            onClick={handleSubmit}
            classNames={{
              root: `py-2 px-4 sm:px-5 rounded-md w-[50%] justify-center transition-all duration-200 
                bg-green-500 hover:bg-green-600          
            `,
              label_: "text-sm font-medium text-white",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchasePopup;
