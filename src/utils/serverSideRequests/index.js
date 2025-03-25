import {
  fetchAddressBookDetails,
  fetchBankAccountDetails,
  fetchCountrieList,
  fetchDashboardData,
  fetchDepositHistory,
  fetchDepositHistoryMonthly,
  fetchOrderHistory,
  fetchProfileDetails,
  fetchTransactionHistory,
  fetchTransactionHistoryMonthly,
  fetchUserDetails,
  fetchWalletBalance,
} from "../apiHandler/request";

export const fetchSettingsPageDetails = async (profile, token) => {
  const validProfiles = ["myAccount", "changepassword", "addressBook"];

  try {
    if (validProfiles?.includes(profile)) {
      const [addressDetails, profileDetails, fetchCountries] =
        await Promise.all([
          fetchAddressBookDetails(token),
          fetchProfileDetails(token, "GET"),
          fetchCountrieList(token),
        ]);
      return { addressDetails, profileDetails, fetchCountries };
    } else if (profile === "bankAccounts") {
      const bankDetails = await fetchBankAccountDetails(token);
      return {
        bankDetails,
      };
    } else if (profile == "myTeam") {
      const userDetails = await fetchUserDetails(token);
      return { userDetails };
    }
  } catch {}
};

export const fetchWalletPageDetails = async (token) => {
  try {
    const [walletBalance, depositHistory, transactionHistory] =
      await Promise.all([
        fetchWalletBalance(token),
        fetchDepositHistoryMonthly(token),
        fetchTransactionHistoryMonthly(token),
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
