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
  purchaseTicketConfirm,
  purchaseTicketsBuy,
  purchaseTicketValidate,
} from "@/utils/apiHandler/request";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdyenDropIn from "./adyenPurchaseNewCard";

const ConfirmPurchasePopup = ({ onClose }) => {
  const { confirmPurchasePopupFields } = useSelector((state) => state?.common);
  const [loader, setLoader] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("LMT Pay");
  const [addressDetails, setAddressDetails] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [showAdyenDropIn, setShowAdyenDropIn] = useState(false);
  const [adyenBookingId, setAdyenBookingId] = useState(null);

  const { data = {} } = confirmPurchasePopupFields;
  const [selectedQuantity, setSelectedQuantity] = useState(
    data?.purchase?.price_breakdown?.ticket_quantity
  );
  const handlePaymentChange = (name) => {
    setSelectedPayment(name);
  };

  const handleAddressChange = (id) => {
    setSelectedAddress(id);
  };

  const fetchAddressPaymentDetails = async () => {
    try {
      const [addressDetails, paymentDetails] = await Promise.allSettled([
        fetchAddressBookDetails(),
        paymentPurchaseDetails("", {
          currency: data?.purchase?.price_breakdown?.currency,
        }),
      ]);
      setAddressDetails(addressDetails?.value);
      setPaymentDetails(paymentDetails?.value?.payment_methods);
    } catch (error) {
      toast.error("Failed to load address and payment details");
    }
  };

  useEffect(() => {
    fetchAddressPaymentDetails();
  }, []);

  const bookingConfirm = async (success, message) => {
    if (success) {
      toast.success(message);
      onClose();
    } else {
      toast.error(message || "Booking confirmation failed");
    }
  };

  const handleSubmit = async () => {
    try {
      setLoader(true);

      // Validate address selection
      if (!addressDetails || addressDetails.length === 0) {
        bookingConfirm(false,"Please add a billing address");
        setLoader(false);
        return;
      }

      const paymentMethod = selectedPayment == "LMT Pay" ? 1 : 2;
      const fetchOrderIdPayload = {
        currrency: data?.purchase?.price_breakdown?.currency,
        client_country: "IN",
        lang: "en",
        match_id: `${data?.matchId}`,
        quantity: `${selectedQuantity}`,
        sell_ticket_id: `${data?.sNo}`,
        payment_method: `${paymentMethod}`,
      };

      const response = await purchaseTicketValidate(
        "",
        {},
        fetchOrderIdPayload
      );

      if (response?.status == 1) {
        const secondApiPayload = {
          cart_id: response?.cart_id,
          lang: "en",
          client_country: "IN",
          billing_address_id: `${addressDetails?.[selectedAddress]?.id}`,
          payment_method: `${paymentMethod}`,
        };

        const apiResponse = await purchaseTicketsBuy(
          "",
          response?.cart_id,
          {},
          secondApiPayload
        );

        if (apiResponse?.status == "success") {
          if (paymentMethod == 1) {
            const confirmationPayload = {
              booking_id: apiResponse?.booking_id,
              payment_method: paymentMethod,
            };

            const confirmResponse = await purchaseTicketConfirm(
              "",
              confirmationPayload
            );

            if (confirmResponse?.result?.booking_status == "Success") {
              bookingConfirm(true, "Booking Confirmed Successfully");
            } else {
              bookingConfirm(
                false,
                confirmResponse?.result?.message ||
                  "Booking confirmation failed"
              );
            }
          } else if (paymentMethod == 2) {
            setAdyenBookingId(apiResponse?.booking_id);
            setShowAdyenDropIn(true);
          }
        } else {
          bookingConfirm(false, apiResponse?.data || "Booking failed");
        }
      } else {
        bookingConfirm(false, response?.data || "Booking failed");
      }
    } catch (error) {
      bookingConfirm(false, "An unexpected error occurred. Please try again later.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Toast container */}
      <ToastContainer position="top-right" closeOnClick autoClose={5000} />

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
        <PurchaseCard
          data={data}
          setSelectedQuantity={setSelectedQuantity}
          selectedQuantity={selectedQuantity}
        />
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
      {showAdyenDropIn && (
        <AdyenDropIn bookingId={adyenBookingId} paymentMethod={2} />
      )}
    </div>
  );
};

export default ConfirmPurchasePopup;
