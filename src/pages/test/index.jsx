import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  getLinkedCards,
  getPaymentDetails,
  storePaymentMethod,
} from "@/utils/apiHandler/request";
import { readCookie } from "@/utils/helperFunctions/cookie";

const PaymentGateway = () => {
  const [savedCards, setSavedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [adyenLoaded, setAdyenLoaded] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const adyenInitializedRef = useRef(false);
  const shopperReference = "2258";

  const getAuthToken = () => `Bearer ${readCookie("auth_token")}`;

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/5.16.0/adyen.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/5.16.0/adyen.js";
    script.onload = () => setAdyenLoaded(true);
    script.onerror = (err) => console.error("Adyen load error", err);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  const fetchSavedCards = useCallback(async () => {
    try {
      const cards = await getLinkedCards("", "", shopperReference);
      if (cards.success) setSavedCards(cards.data);
    } catch (err) {
      console.error("Error fetching cards", err);
    }
  }, []);

  const removeSavedCard = async (recurringDetailReference) => {
    try {
      const res = await fetch(
        "https://api2.listmyticket.com/b2b/linkedcard/remove-saved-card",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: getAuthToken(),
          },
          body: JSON.stringify({ recurringDetailReference, shopperReference }),
        }
      );
      const result = await res.json();
      if (result.success) {
        fetchSavedCards();
        alert("Card removed successfully!");
      }
    } catch (err) {
      console.error("Remove card error", err);
    }
  };

  const initializeAdyen = useCallback(async () => {
    if (isLoading || !adyenLoaded || adyenInitializedRef.current) return;
    setIsLoading(true);
    adyenInitializedRef.current = true;

    try {
      const container = document.getElementById("dropin-container");
      if (container) container.innerHTML = "";

      const config = await getPaymentDetails();
      if (!config?.clientKey || !config?.paymentMethods)
        throw new Error("Invalid config");

      const checkout = await window.AdyenCheckout({
        environment: "test",
        clientKey: config.clientKey,
        paymentMethodsResponse: config.paymentMethods,
        merchantOrigin: window.location.origin,
        showPayButton: true,
        translations: { en_US: { payButton: "Link Card" } },
        onSubmit: async (state, component) => {
          try {
            const payload = {
              paymentMethod: {
                ...state.data.paymentMethod,
                holderName: state.data.paymentMethod.holderName || "Unknown",
                billingAddress: {
                  country:
                    state.data.paymentMethod.billingAddress?.country || "US",
                },
              },
              shopperReference,
            };
            const result = await storePaymentMethod("", payload);
            if (result.success) {
              alert("Card linked successfully!");
              component.setStatus("success");
              fetchSavedCards();
              setShowAddCard(false);
              adyenInitializedRef.current = false;
            } else {
              alert("Failed to link card");
              component.setStatus("error");
            }
          } catch (err) {
            console.error("onSubmit error", err);
            component.setStatus("error");
          }
        },
      });

      checkout.create("card").mount("#dropin-container");
    } catch (err) {
      console.error("Adyen init error", err);
    } finally {
      setIsLoading(false);
    }
  }, [adyenLoaded, fetchSavedCards, isLoading]);

  useEffect(() => {
    fetchSavedCards();
  }, [fetchSavedCards]);

  useEffect(() => {
    if (showAddCard && adyenLoaded && !adyenInitializedRef.current) {
      initializeAdyen();
    }
  }, [showAddCard, adyenLoaded, initializeAdyen]);

  const handleCancelClick = () => {
    setShowAddCard(false);
    adyenInitializedRef.current = false;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Credit card</h2>

      {savedCards.length > 0 ? (
        <div className="mb-6">
          {savedCards.map((card, index) => {
            const info = card.RecurringDetail;
            const cardType = info.variant || "Mastercard";
            const lastFour = info.card.number || "XXXX";

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-md p-4 mb-2"
              >
                <div className="font-medium mb-2">{cardType}</div>
                <div className="text-gray-600 text-sm">
                  <div>Card details</div>
                  <div>•••• •••• •••• {lastFour}</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border border-gray-200 rounded-md p-4 mb-6 text-gray-600">
          <p>No saved cards</p>
        </div>
      )}

      <button
        onClick={() => {
          adyenInitializedRef.current = false;
          setShowAddCard(true);
        }}
        className="flex items-center cursor-pointer justify-center gap-2 bg-purple-700 text-white py-2 px-4 rounded-md text-sm"
        disabled={isLoading || !adyenLoaded}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Add card
      </button>

      {/* Keep the rest of your code for adding a new card */}
      {showAddCard && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-medium text-gray-800 m-0">
              Add Payment Method
            </h3>
            <button
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
              onClick={() => {
                setShowAddCard(false);
                adyenInitializedRef.current = false;
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div id="dropin-container" className="mb-6"></div>

          {/* Keep existing cancel button and encryption message */}
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;
