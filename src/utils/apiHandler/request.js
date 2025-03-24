import axios from "axios";
import AJAX, { fetchAuthorizationKey } from ".";
import { API_ROUTES } from "./apiRoutes";

const isClient = typeof window !== "undefined";

const makeRequest = async ({
  url,
  method,
  data = null,
  token,
  formData = null,
  params = null,
}) => {
  const ROOT_URL = process.env.API_BASE_URL;
  let modifiedUrl = isClient ? url : `${ROOT_URL}${url}`;
  // Appending params if available
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      modifiedUrl.includes("?")
        ? (modifiedUrl += `&${key}=${value}`)
        : (modifiedUrl += `?${key}=${value}`);
    });
  }
  // Making API call based on client or server
  console.log(modifiedUrl, method, { ...fetchAuthorizationKey(token) },'ooooooooooooo');
  try {
    const response = isClient
      ? (await method.toLowerCase()) === "get"
        ? AJAX.get(modifiedUrl, { ...(token && { token: token }) })
        : AJAX.post(
            url,
            data,
            formData,
            { ...(token && { token: token }) },
            method
          )
      : await axios({
          url: modifiedUrl,
          method,
          headers: { ...fetchAuthorizationKey(token) },
          ...(data && { data: data }),
        });
    return response;
  } catch (error) {
    console.error(`${error?.response?.status} error in API: ${url}`, error);
    throw error;
  }
};

export const loginUser = async (token, data) => {
  try {
    const response = await makeRequest({
      url: API_ROUTES.LOGIN,
      method: "POST",
      data: data,
    });
    return response?.data?.success ? response?.data?.data : {};
  } catch (error) {
    console.log("ERROR in loginUser", error);
    throw error;
  }
};

export const fetchDashboardData = async (token) => {
  try {
    const response = await makeRequest({
      url: API_ROUTES.DASHBOARD,
      method: "GET",
      ...(token && { token: token }),
    });
    return response?.data?.success ? response?.data?.data : {};
  } catch (error) {
    console.log("ERROR in fetchingDashboardData", error);
    throw error;
  }
};

export const fetchProfileDetails = async (token, method, data) => {
  try {
    const response = await makeRequest({
      url: API_ROUTES.PROFILE_DETAILS,
      method: method ?? "GET",
      ...(token && { token: token }),
      ...(data && { data: data }),
    });
    return response?.data?.success ? response?.data?.data : {};
  } catch (error) {
    console.log("ERROR in fetchingProfileDetails", error);
    throw error;
  }
};

export const fetchAddressBookDetails = async (token) => {
  try {
    const response = await makeRequest({
      url: API_ROUTES.FETCH_ADDRESS_BOOK_DETAILS,
      method: "GET",
      ...(token && { token: token }),
    });
    return response?.data?.success ? response?.data?.data : {};
  } catch (error) {
    console.log("ERROR in fetchingAddressBookDetails", error);
    throw error;
  }
};

export const changePasswordRequest = async (token, data) => {
  try {
    const response = await makeRequest({
      url: API_ROUTES.CHANGE_PASSWORD,
      method: "POST",
      data: data,
      ...(token && { token: token }),
    });
    return response?.data?.success ? response?.data?.data : {};
  } catch (error) {
    console.log("ERROR in changePasswordRequest", error);
    throw error;
  }
};

export const fetchWalletBalance = async (token) => {
  try {
    const response = await makeRequest({
      url: API_ROUTES.WALLET_BALANCE,
      method: "GET",
      ...(token && { token: token }),
    });
    return response?.data?.success ? response?.data?.data : {};
  } catch (error) {
    console.log("ERROR in fetchWalletBalance", error);
    throw error;
  }
};

export const fetchDepositHistory = async (token) => {
  try {
    const response = await makeRequest({
      url: API_ROUTES.DEPOSIT_HISTORY,
      method: "GET",
      ...(token && { token: token }),
    });
    return response?.data?.success ? response?.data?.data : {};
  } catch (error) {
    console.log("ERROR in fetchDepositHistory", error);
    throw error;
  }
};

export const fetchTransactionHistory = async (token) => {
  try {
    const response = await makeRequest({
      url: API_ROUTES.TRANSACTION_HISTORY,
      method: "GET",
      ...(token && { token: token }),
    });
    return response?.data?.success ? response?.data?.data : {};
  } catch (error) {
    console.log("ERROR in fetchTransactionHistory", error);
    throw error;
  }
};
