const ROOT_URL = process.env.API_BASE_URL;

export const API_ROUTES = {
  LOGIN: `/auth/login`,
  REGISTER_USER: "/auth/register",
  VERIFY_EMAIL: "/auth/verify-email",
  RESEND_VERIFICATION_REQUEST: "/auth/resend-verify-email",
  DASHBOARD: `/wallet/dashboard`,
  PROFILE_DETAILS: `/settings/profile`,
  GET_ORDER_HISTORY: `/wallet/get-order-history`,
  SEND_RESET_REQUEST: `/auth/password/reset-request`,
  FETCH_ADDRESS_BOOK_DETAILS: `/settings/address-book`,
  FETCH_BANK_ACCOUNTS: `/settings/bank-accounts`,
  CHANGE_PASSWORD: `/settings/change-password`,
  WALLET_BALANCE: `/wallet/get-wallet-balance`,
  DEPOSIT_HISTORY: `/wallet/get-deposit-history`,
  TRANSACTION_HISTORY: `/wallet/get-transaction-history`,
  MONTHLY_TRANSACTION_HISTORY: `/wallet/get-transaction-history-monthly`,
  MONTHLY_DEPOSIT_HISTORY: `/wallet/get-deposit-history-monthly`,
  GET_DEPOSIT_DETAILS: `/wallet/get-deposit-details`,
  GET_TRANSACTION_DETAILS: `/wallet/get-transaction-details`,
  SEND_DEPOSIT_REQUEST: `/wallet/deposit`,
  REFRESH_AUTH_TOKEN: `/auth/refresh-token`,
  FETCH_COUNTRIES: `/settings/countries`,
  FETCH_CITIES: `/settings/cities`,
  FETCH_USER_DETAILS: `/travelpartner/customer`,
  RESET_PASSWORD: `/settings/reset-password`,
  GET_PAYMENT_CONFIG: "/get-payment-config",
  STORE_PAYMENT_METHOD: "/store-payment-method",
  GET_LINKED_CARDS: "/get-linked-cards",
  GET_CURRENCY: "/settings/currency",
  GET_DIALING_CODE: "/settings/dialing-code",
  REMOVE_SAVED_CARD: "/remove-saved-card",
  ACCOUNT_REFERENCE: "/wallet/account-reference",
  HOT_EVENTS: "/purchase/events/hot",
  LAST_MINUTE_EVENTS: "/purchase/events/last-minute",
  FETCH_EVENT_SEARCH: "/event-search",
  FETCH_VENUE: `/settings/stadium`,
  FETCH_ALL_CATEGORIES: "/settings/allcategories",
  FETCH_TAB_TOTAL: "/purchase/tab-total",
  RECENTLY_VIEWED_EVENTS: `/purchase/events/recently-viewed`,
  PURCHASE_EVENTS: "/purchase/events",
  PURCHASE_TRACKING: "/purchase/tracking",
  PURCHASE_TRACKING_SEARCH: "/purchase/tracking-search",
  PURCHASE_TICKETS: "/purchase/tickets",
  PURCHASE_HISTORY: "/purchase/history",
  TICKET_QUANTITY_UPDATE: "/purchase/tickets-quantity-update",
  PURCHASE_PAYMENT_METHODS: "/purchase/payment-methods",
  PURCHASE_TICKETS_VALIDATE: "/purchase/tickets/validate",
  PURCHASE_TICKETS_BUY: "/purchase/tickets/buy",
  DELETE_ADDRESS_BOOK: "/settings/delete-address-book",
  ADYEN_CREATE_SESSION: "/adyen/createsession",
  ADYEN_PAYMENT_UPDATE: "/adyen/paymentUpdate",
  ADYEN_PAYMENT_SUBMIT: "/adyen/paymentResponse",
  PURCHASE_TICKET_CONFIRMATON: "/purchase/tickets/confirmation",
  PAY_WITH_SAVED_CARDS: "/adyen/pay-with-saved-card",
  PURCHASE_ATTENDEE_DETAILS: "/purchase/atendee-update-bulk",
  GET_CONTACT_DETAILS: "/settings/get-contact-details",
  GET_WALLET_BALANCE: "/wallet/get-wallet-balance",
  GET_PARTNER_SETTINGS: "/settings/get-partner-setting",
  POST_PARTNER_SETTINGS: "/settings/partner-setting",
  UPDATE_NOMINEE: "/update_applynominee",
};
