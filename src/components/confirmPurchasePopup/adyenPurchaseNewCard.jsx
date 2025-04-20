import {
  adyenCreateSession,
  adyenPaymentUpdate,
} from "@/utils/apiHandler/request";
import React, { useEffect, useState, useRef } from "react";

const AdyenDropIn = ({ bookingId, paymentMethod }) => {
  const dropinContainerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Load Adyen scripts and styles
    const loadAdyenResources = async () => {
      try {
        if (!document.querySelector('script[src*="adyen.js"]')) {
          const script = document.createElement("script");
          script.src =
            "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/5.16.0/adyen.js";
          script.crossOrigin = "anonymous";
          
          // Create a promise to handle script loading
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = () => reject(new Error("Failed to load Adyen script"));
            document.head.appendChild(script);
          });
        }

        if (!document.querySelector('link[href*="adyen.css"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href =
            "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/5.16.0/adyen.css";
          link.crossOrigin = "anonymous";
          document.head.appendChild(link);
        }
        
        setIsLoaded(true);
      } catch (err) {
        console.error("Error loading Adyen resources:", err);
        setError(err.message);
      }
    };

    loadAdyenResources();
  }, []);

  useEffect(() => {
    const initAdyenCheckout = async () => {
      if (!isLoaded || !window.AdyenCheckout || !dropinContainerRef.current) {
        return;
      }

      try {
        setIsProcessing(true);
        
        // Create session
        const sessionResponse = await adyenCreateSession("", {
          booking_id: bookingId,
        });
        
        console.log("Session data:", sessionResponse);
        
        if (!sessionResponse || !sessionResponse.session) {
          throw new Error("Failed to initialize Adyen session: Invalid response data");
        }

        // Verify the clientKey is valid
        if (!sessionResponse.clientKey || typeof sessionResponse.clientKey !== 'string' || !sessionResponse.clientKey.startsWith('test_')) {
          throw new Error("Invalid client key received from server");
        }

        // Initialize checkout
        const checkout = await window.AdyenCheckout({
          environment: sessionResponse.environment || 'test', // Ensure environment is set
          clientKey: sessionResponse.clientKey,
          session: {
            id: sessionResponse.session.id,
            sessionData: sessionResponse.session.sessionData
          },
          onPaymentCompleted: (result, component) => {
            console.log("Payment completed:", result);
            // Handle successful payment here (e.g., redirect or show success message)
          },
          onError: (error, component) => {
            console.error("Payment error:", error);
            setError(`Payment processing error: ${error.message || "Unknown error"}`);
          },
          onAdditionalDetails: async (state, component) => {
            try {
              const response = await adyenPaymentUpdate("", {
                ...state.data,
                booking_id: bookingId,
                payment_method: paymentMethod,
              });
              
              const data = await response.json();
              
              if (response.ok) {
                if (data.action) {
                  component.handleAction(data.action);
                } else {
                  console.log("Payment update success:", data);
                  // Handle success case
                }
              } else {
                throw new Error(`Payment update failed: ${response.status}`);
              }
            } catch (err) {
              console.error("Payment update error:", err);
              setError(err.message || "Payment update failed");
            }
          },
          paymentMethodsConfiguration: {
            card: {
              hasHolderName: true,
              holderNameRequired: true,
              enableStoreDetails: false,
              hideCVC: false,
              showBrandsUnderCardNumber: true
            }
          },
          analytics: {
            enabled: false
          },
          locale: "en-US",
          styling: {
            theme: "light",
          }
        });

        // Mount the drop-in component
        const dropinComponent = checkout
          .create("dropin", {
            openFirstPaymentMethod: true,
            openFirstStoredPaymentMethod: false,
            showRemovePaymentMethodButton: false,
            showPayButton: true
          })
          .mount(dropinContainerRef.current);
          
      } catch (err) {
        console.error("Adyen initialization error:", err);
        setError(err.message || "Failed to initialize payment form");
      } finally {
        setIsProcessing(false);
      }
    };

    if (isLoaded) {
      initAdyenCheckout();
    }
  }, [isLoaded, bookingId, paymentMethod]);

  return (
    <div className="adyen-payment-container">
      {/* {error && (
        <div className="error-message p-3 bg-red-100 text-red-700 rounded mb-4">
          {error}
        </div>
      )}
      {isProcessing && (
        <div className="processing-indicator p-3 bg-blue-50 text-blue-700 rounded mb-4">
          Loading payment form...
        </div>
      )} */}
      <div 
        ref={dropinContainerRef} 
        id="dropin-container"
        className="p-4 border border-gray-200 rounded"
      />
    </div>
  );
};

export default AdyenDropIn;