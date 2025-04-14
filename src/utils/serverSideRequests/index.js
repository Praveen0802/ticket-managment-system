import {
  fetchAddressBookDetails,
  FetchAllCategories,
  fetchBankAccountDetails,
  fetchCountrieList,
  fetchDashboardData,
  fetchDepositHistory,
  fetchDepositHistoryMonthly,
  FetchHotEvents,
  fetchOrderHistory,
  fetchProfileDetails,
  fetchRecentlyViewedList,
  fetchTransactionHistory,
  fetchTransactionHistoryMonthly,
  fetchUserDetails,
  fetchWalletBalance,
  getLinkedCards,
  LastMinuteEvents,
} from "../apiHandler/request";

export const fetchSettingsPageDetails = async (profile, token, ctx) => {
  const validProfiles = ["myAccount", "changepassword"];
  try {
    if (validProfiles?.includes(profile)) {
      const [addressDetails, profileDetails, fetchCountries] =
        await Promise.all([
          fetchAddressBookDetails(token),
          fetchProfileDetails(token, "GET"),
          fetchCountrieList(token),
        ]);
      return { addressDetails, profileDetails, fetchCountries };
    } else if (profile === "addressBook") {
      const [primaryAddress, defaultAddress, profileDetails, fetchCountries] =
        await Promise.all([
          fetchAddressBookDetails(token, "", "GET", "", {
            is_primary_address: 1,
          }),
          fetchAddressBookDetails(token, "", "GET", "", {
            is_primary_address: 0,
          }),
          fetchProfileDetails(token, "GET"),
          fetchCountrieList(token),
        ]);
      return { primaryAddress, defaultAddress, profileDetails, fetchCountries };
    } else if (profile === "bankAccounts") {
      const [bankDetails, fetchCountries] = await Promise.all([
        fetchBankAccountDetails(token),
        fetchCountrieList(token),
      ]);
      return {
        bankDetails,
        fetchCountries,
      };
    } else if (profile == "myCustomers") {
      const [userDetails, fetchCountries] = await Promise.all([
        fetchUserDetails(token),
        fetchCountrieList(token),
      ]);
      return { userDetails, fetchCountries };
    } else if (profile == "linkedCards") {
      const shopperRefernce = ctx?.req?.cookies?.user_token;
      const linkedCards = await getLinkedCards(token, "", shopperRefernce);
      return { linkedCards, shopperRefernce };
    }
  } catch {}
};

export const fetchWalletPageDetails = async (token) => {
  try {
    const [walletBalance, depositHistory, transactionHistory, countriesList] =
      await Promise.all([
        fetchWalletBalance(token),
        fetchDepositHistoryMonthly(token),
        fetchTransactionHistoryMonthly(token),
        fetchCountrieList(token),
      ]);
    return {
      ...transactionHistory,
      ...depositHistory,
      ...walletBalance,
      countriesList,
    };
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

export const fetchTradePageData = async (tradeType, token) => {
  if (tradeType === "home") {
    const [hotEvents, lastMinuteEvents, recentlyViewedEvents] =
      await Promise.all([
        FetchHotEvents(token),
        LastMinuteEvents(token),
        fetchRecentlyViewedList(token),
      ]);

    return { hotEvents, lastMinuteEvents, recentlyViewedEvents };
  }
  try {
  } catch {
    return {};
  }
};
