const ROOT_URL = process.env.API_BASE_URL;

export const API_ROUTES = {
  LOGIN: `/auth/login`,
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
  GET_PAYMENT_CONFIG:'/linkedcard/get-payment-config',
  STORE_PAYMENT_METHOD:'/linkedcard/store-payment-method',
  GET_LINKED_CARDS:'/linkedcard/get-linked-cards'
};
