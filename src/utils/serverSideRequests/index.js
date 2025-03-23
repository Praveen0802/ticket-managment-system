import {
  fetchAddressBookDetails,
  fetchDepositHistory,
  fetchProfileDetails,
  fetchTransactionHistory,
  fetchWalletBalance,
} from "../apiHandler/request";

export const fetchSettingsPageDetails = async (profile, token) => {
  if (profile === "myAccount") {
    try {
      const [addressBookDetails, profileDetails] = await Promise.all([
        fetchAddressBookDetails(token),
        fetchProfileDetails(token, "GET"),
      ]);
      return { addressBookDetails, profileDetails };
    } catch {}
  }
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
