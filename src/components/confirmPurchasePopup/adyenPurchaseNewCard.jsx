import {
  adyenCreateSession,
  adyenPaymentUpdate,
} from "@/utils/apiHandler/request";
import React, { useEffect, useState, useRef } from "react";

const AdyenDropIn = ({ bookingId, paymentMethod }) => {
  const dropinContainerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load Adyen scripts and styles
    const loadAdyenResources = async () => {
      if (!document.querySelector('script[src*="adyen.js"]')) {
        const script = document.createElement("script");
        script.src =
          "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/5.16.0/adyen.js";
        script.crossOrigin = "anonymous";
        script.onload = () => setIsLoaded(true);
        script.onerror = () => setError("Failed to load Adyen script");
        document.head.appendChild(script);
      } else {
        setIsLoaded(true);
      }

      if (!document.querySelector('link[href*="adyen.css"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/5.16.0/adyen.css";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
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
        // Create session
        const data = await adyenCreateSession("", {
          booking_id: bookingId,
        });

        if (!data || !data.session) {
          setError("Failed to initialize Adyen session");
          return;
        }

        // Initialize checkout
        const checkout = await window.AdyenCheckout({
          environment: data.environment,
          clientKey: data.clientKey,
          session: data.session,
          onPaymentCompleted: (result, component) => {
            console.log("Payment completed:", result);
          },
          onAdditionalDetails: (state, component) => {
            adyenPaymentUpdate("", {
              ...state.data,
              booking_id: bookingId,
              payment_method: paymentMethod,
            })
              .then((res) => res.json())
              .then((data) => {
                component.handleAction(data.action);
              })
              .catch((err) => {
                console.error(err);
                setError("Payment update failed");
              });
          },
          onError: (error, component) => {
            console.error("Payment error:", error);
            setError("Payment processing error");
          },
        });

        // Mount dropin
        checkout.create("dropin").mount(dropinContainerRef.current);
      } catch (err) {
        console.error("Adyen initialization error:", err);
        setError("Failed to initialize payment form");
      }
    };

    initAdyenCheckout();
  }, [isLoaded, bookingId, paymentMethod]);

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <div ref={dropinContainerRef} id="dropin-container"></div>
    </div>
  );
};

export default AdyenDropIn;

// Usage example:
// <AdyenDropIn bookingId="55651" paymentMethod={1} />
