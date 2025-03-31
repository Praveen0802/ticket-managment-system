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

  const getAuthToken = () => {
    return `Bearer ${readCookie("auth_token")}`;
  };

  const shopperReference = "2258"; // This should be dynamic in a real application

  // Load Adyen scripts and styles exactly like in your HTML version
  useEffect(() => {
    // First load CSS
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/5.16.0/adyen.css';
    linkElement.integrity = 'sha384-zy4t7axSdzHBMGqwJAynlv3eFVNiWw68LMf7vgKXxl2zZ6A8FlpucOoA/J//GBaQ';
    linkElement.crossOrigin = 'anonymous';
    document.head.appendChild(linkElement);

    // Then load JS
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/5.16.0/adyen.js';
    scriptElement.integrity = 'sha384-eOf0O1MTPGB1DQpr+Yha0MrmJruQb5S82+tuyo4sLiyfo1hgbf6W+fNfLjjU7Sks';
    scriptElement.crossOrigin = 'anonymous';
    
    scriptElement.onload = () => {
      console.log('Adyen JS loaded successfully');
      setAdyenLoaded(true);
    };
    
    scriptElement.onerror = (error) => {
      console.error('Error loading Adyen JS:', error);
    };
    
    document.head.appendChild(scriptElement);

    // Cleanup function
    return () => {
      if (document.head.contains(linkElement)) {
        document.head.removeChild(linkElement);
      }
      if (document.head.contains(scriptElement)) {
        document.head.removeChild(scriptElement);
      }
    };
  }, []);

  const fetchSavedCards = useCallback(async () => {
    try {
      const cards = await getLinkedCards("", "", shopperReference);
      if (cards.success) {
        setSavedCards(cards.data);
      } else {
        alert("Failed to fetch saved cards: " + cards.message);
      }
    } catch (error) {
      console.error("Error fetching saved cards:", error);
    }
  }, []);

  const removeSavedCard = async (recurringDetailReference) => {
    try {
      const response = await fetch(
        "https://api2.listmyticket.com/b2b/linkedcard/remove-saved-card",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: getAuthToken(),
          },
          body: JSON.stringify({
            recurringDetailReference: recurringDetailReference,
            shopperReference: shopperReference,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        fetchSavedCards();
        alert("Card removed successfully!");
      } else {
        alert("Failed to remove card: " + result.message);
      }
    } catch (error) {
      console.error("Error removing saved card:", error);
    }
  };

  const initializeAdyen = useCallback(async () => {
    if (isLoading || !adyenLoaded) {
      if (!adyenLoaded) {
        alert("Adyen is still loading. Please try again in a moment.");
      }
      return;
    }

    setIsLoading(true);
    
    try {
      // Clear any existing content
      const container = document.getElementById('dropin-container');
      if (container) {
        container.innerHTML = '';
      }
      
      const config = await getPaymentDetails();
      
      if (!config || !config.clientKey || !config.paymentMethods) {
        console.error("Invalid config received:", config);
        alert("Failed to initialize payment form: Invalid configuration");
        setIsLoading(false);
        return;
      }

      // Create checkout instance using window.AdyenCheckout like in your HTML code
      if (typeof window.AdyenCheckout !== 'function') {
        throw new Error('AdyenCheckout not available. Make sure the script is loaded properly.');
      }

      const checkout = await window.AdyenCheckout({
        environment: 'test',
        clientKey: config.clientKey,
        paymentMethodsResponse: config.paymentMethods,
        merchantOrigin: window.location.origin,
        showPayButton: true,
        translations: {
          en_US: { "payButton": "Link Card" }
        },
        onSubmit: async (state, component) => {
          try {
            const payload = {
              paymentMethod: {
                ...state.data.paymentMethod,
                holderName: state.data.paymentMethod.holderName || "Unknown",
                billingAddress: {
                  country: state.data.paymentMethod.billingAddress?.country || "US",
                },
              },
              shopperReference: shopperReference,
            };
            
            const result = await storePaymentMethod("", payload);
            if (result.success) {
              alert("Card linked successfully!");
              component.setStatus("success");
              fetchSavedCards();
            } else {
              alert("Failed to link card: " + result.message);
              component.setStatus("error");
            }
          } catch (error) {
            console.error("Error in onSubmit:", error);
            component.setStatus("error");
          }
        }
      });
      
      // Mount the card component
      checkout.create('card').mount('#dropin-container');
    } catch (error) {
      console.error("Error initializing Adyen:", error);
      alert(`Failed to initialize payment form: ${error.message}`);
      
      // Display error in the container
      const container = document.getElementById('dropin-container');
      if (container) {
        container.innerHTML = `
          <div style="text-align: center; padding: 20px; color: red;">
            <p>Error: ${error.message}</p>
            <p>Please try again later.</p>
          </div>
        `;
      }
    } finally {
      setIsLoading(false);
    }
  }, [fetchSavedCards, isLoading, adyenLoaded]);

  useEffect(() => {
    fetchSavedCards();
  }, [fetchSavedCards]);

  return (
    <div>
      <div className="container">
        <div id="dropin-container" style={{ minHeight: "200px" }}></div>
        <button
          onClick={initializeAdyen}
          className="pay-button"
          style={{ width: "100px", height: "40px" }}
          disabled={isLoading || !adyenLoaded}
        >
          {isLoading ? "Loading..." : !adyenLoaded ? "Adyen Loading..." : "Link Card"}
        </button>
      </div>

      <div className="container saved-cards">
        <h3>Saved Cards</h3>
        {savedCards.length === 0 ? (
          <p>No saved cards found.</p>
        ) : (
          savedCards.map((card, index) => {
            const cardInfo = card.RecurringDetail;
            return (
              <div key={index} className="card-item">
                <p>
                  Card:
                  <img
                    src={`https://cdf6519016.cdn.adyen.com/checkoutshopper/images/logos/${cardInfo.variant}.svg`}
                    alt="Card Image"
                    style={{ width: "50px", height: "auto", margin: "0 10px" }}
                  />
                  **** **** **** {cardInfo.card.number}
                </p>
                <p>Holder: {cardInfo.card.holderName}</p>
                <button
                  onClick={() =>
                    removeSavedCard(cardInfo.recurringDetailReference)
                  }
                >
                  Remove
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PaymentGateway;