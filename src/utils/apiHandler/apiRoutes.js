const ROOT_URL = process.env.API_BASE_URL;

export const API_ROUTES = {
  LOGIN: `/auth/login`,
  DASHBOARD: `/wallet/dashboard`,
  PROFILE_DETAILS: `/settings/profile`,
  FETCH_ADDRESS_BOOK_DETAILS: `/settings/address-book`,
  CHANGE_PASSWORD: `/settings/change-password`,
  WALLET_BALANCE: `/wallet/get-wallet-balance`,
  DEPOSIT_HISTORY: `/wallet/get-deposit-history`,
  TRANSACTION_HISTORY: `/wallet/get-transaction-history`,
};
