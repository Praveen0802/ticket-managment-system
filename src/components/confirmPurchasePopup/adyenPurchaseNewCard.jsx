import React, { useEffect, useRef } from "react";
import { adyenCreateSession, adyenPaymentSubmit, adyenPaymentUpdate } from "@/utils/apiHandler/request";

const AdyenDropIn = ({ bookingId, paymentMethod }) => {
  const dropinContainerRef = useRef(null);

  useEffect(() => {
    const loadAdyen = async () => {
      try {
        // First, load the Adyen script manually if using script tags
        if (!window.AdyenCheckout) {
          // Load script
          const script = document.createElement("script");
          script.src = "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/5.16.0/adyen.js";
          script.crossOrigin = "anonymous";
          
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }
        
        // Load CSS
        if (!document.querySelector('link[href*="adyen.css"]')) {
          const adyenCSS = document.createElement("link");
          adyenCSS.rel = "stylesheet";
          adyenCSS.href = "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/5.16.0/adyen.css";
          document.head.appendChild(adyenCSS);
        }

        // Create session with backend
        const data = await adyenCreateSession("", {
          booking_id: bookingId,
        });

        console.log("Session data received:", data);

        // Initialize and mount Adyen Checkout using the global variable
        const checkout = await window.AdyenCheckout({
          environment: data.environment,
          clientKey: data.clientKey,
          session: data.session,

          // Handles both success and failure after final authorization
          onPaymentCompleted: async (result, component) => {
            console.log("Payment completed:", result);
            await adyenPaymentSubmit("", {
              booking_id: bookingId,
              payment_method: paymentMethod,
              resultCode: result?.resultCode,
              pspReference: result?.pspReference || null,
              sessionData: result?.sessionData || null,
              sessionResult: result?.sessionResult || null,
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Final payment update response:", data);
                // Optionally redirect or show message here
              })
              .catch((err) => {
                console.error("Error during final payment update:", err);
              });
          },

          // Handles 3D Secure and other multi-step methods
          onAdditionalDetails: async (state, component) => {
            console.log("onAdditionalDetails triggered:", state);

            await adyenPaymentUpdate("", {
              ...state.data,
              booking_id: bookingId,
              payment_method: paymentMethod,
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(
                  "Response from paymentUpdate (additionalDetails):",
                  data
                );
                if (data.action) {
                  component.handleAction(data.action);
                }
              })
              .catch((err) => {
                console.error(
                  "Error in paymentUpdate (additionalDetails):",
                  err
                );
              });
          },

          onError: (error, component) => {
            console.error("Payment error:", error);
          },
        });

        // Mount the Drop-in component
        if (dropinContainerRef.current) {
          checkout.create("dropin").mount(dropinContainerRef.current);
        }
      } catch (error) {
        console.error("Failed to initialize Adyen:", error);
      }
    };

    loadAdyen();

    // Cleanup function
    return () => {
      // Remove any lingering DOM elements if needed
    };
  }, [bookingId, paymentMethod]); // Re-initialize if these props change

  return (
    <div>
      <div id="dropin-container" ref={dropinContainerRef}></div>
    </div>
  );
};

export default AdyenDropIn;