import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  getLinkedCards,
  getPaymentDetails,
  removeLinkedCard,
  storePaymentMethod,
} from "@/utils/apiHandler/request";
import { readCookie } from "@/utils/helperFunctions/cookie";
import { toast } from "react-toastify";
import Image from "next/image";

const LinkedCards = (props) => {
  const [savedCards, setSavedCards] = useState(props?.linkedCards?.data);
  const [isLoading, setIsLoading] = useState(false);
  const [adyenLoaded, setAdyenLoaded] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const adyenInitializedRef = useRef(false);
  const shopperReference = props?.shopperRefernce;

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
      const result = await removeLinkedCard("", {
        recurringDetailReference,
        shopperReference,
      });

      if (result.success) {
        fetchSavedCards();
        toast.success("Card removed successfully!");
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
    if (showAddCard && adyenLoaded && !adyenInitializedRef.current) {
      initializeAdyen();
    }
  }, [showAddCard, adyenLoaded, initializeAdyen]);

  const handleCancelClick = () => {
    setShowAddCard(false);
    adyenInitializedRef.current = false;
  };

  return (
    <div className="w-full h-full">
      <p className="pb-2 sm:pb-4 text-base sm:text-lg md:text-xl p-3 sm:p-4 font-semibold">
        Linked Cards
      </p>
      <div className="bg-white p-3 sm:p-4 border-[1px] flex flex-col gap-3 sm:gap-4 border-[#eaeaf1] w-full h-full">
        <div className="md:w-[40%]">
          {savedCards?.length > 0 ? (
            <div className="mb-6">
              {savedCards?.map((card, index) => {
                const info = card.RecurringDetail;
                const cardType = info.variant || "Mastercard";
                const lastFour = info.card.number || "XXXX";
                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md p-4 mb-2"
                  >
                    <div className="font-medium mb-2 flex gap-2 items-center">
                      <Image
                        src={`https://cdf6519016.cdn.adyen.com/checkoutshopper/images/logos/${card?.RecurringDetail?.variant}.svg`}
                        alt="Card Image"
                        width={50}
                        height={50}
                        className="h-full"
                      />
                      {cardType}
                    </div>
                    <div className="text-gray-600 text-sm">
                      <div>Card details</div>
                      <div>•••• •••• •••• {lastFour}</div>
                    </div>
                    <button
                      onClick={() =>
                        removeSavedCard(
                          card?.RecurringDetail?.recurringDetailReference
                        )
                      }
                      className="mt-2 text-sm  cursor-pointer  flex items-center gap-1 transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="12.5"
                        viewBox="0 0 10 12.5"
                        className="w-2.5 h-[.8125rem]"
                      >
                        <g
                          id="Group_24"
                          data-name="Group 24"
                          transform="translate(-433.5 -128.5)"
                        >
                          <path
                            id="Rectangle_71"
                            data-name="Rectangle 71"
                            d="M0,0H9A0,0,0,0,1,9,0V8A1,1,0,0,1,8,9H1A1,1,0,0,1,0,8V0A0,0,0,0,1,0,0Z"
                            transform="translate(434 132)"
                          ></path>
                          <rect
                            id="Rectangle_72"
                            data-name="Rectangle 72"
                            width="10"
                            height="1.5"
                            transform="translate(433.5 129.5)"
                          ></rect>
                          <rect
                            id="Rectangle_73"
                            data-name="Rectangle 73"
                            width="5"
                            height="2"
                            transform="translate(436 128.5)"
                          ></rect>
                        </g>
                      </svg>
                    </button>
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
                  className="p-2 text-gray-500 hover:bg-gray-100 cursor-pointer rounded-full"
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
      </div>
    </div>
  );
};

export default LinkedCards;
