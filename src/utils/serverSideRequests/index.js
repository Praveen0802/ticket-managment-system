import {
  fetchAddressBookDetails,
  fetchBankAccountDetails,
  fetchDashboardData,
  fetchDepositHistory,
  fetchOrderHistory,
  fetchProfileDetails,
  fetchTransactionHistory,
  fetchWalletBalance,
} from "../apiHandler/request";

export const fetchSettingsPageDetails = async (profile, token) => {
  const validProfiles = ["myAccount", "changepassword", "addressBook"];

  try {
    if (validProfiles?.includes(profile)) {
      const [addressDetails, profileDetails] = await Promise.all([
        fetchAddressBookDetails(token),
        fetchProfileDetails(token, "GET"),
      ]);
      return { addressDetails, profileDetails };
    } else if (profile === "bankAccounts") {
      const bankDetails = await fetchBankAccountDetails(token);
      return {
        bankDetails,
      };
    }
  } catch {}
};

export const fetchWalletPageDetails = async (token) => {
  try {
    const [walletBalance, depositHistory, transactionHistory] =
      await Promise.all([
        fetchWalletBalance(token),
        fetchDepositHistory(token),
        fetchTransactionHistory(token),
      ]);
    return { ...transactionHistory, ...depositHistory, ...walletBalance };
  } catch {}
};

export const fetchDashboardPageDetails = async (token) => {
  try {
    const [dashboardData, orderHistory, transactionHistory] = await Promise.all(
      [
        fetchDashboardData(token),
        fetchOrderHistory(token),
        fetchTransactionHistory(token),
      ]
    );
    return { dashboardData, orderHistory, transactionHistory };
  } catch {}
};
