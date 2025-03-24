import axios from "axios";
import { checkValidAuthToken, getAuthToken } from "../helperFunctions";
import { getApiCall, postApiCall, putApiCall } from "./apiCall";

export const fetchAuthorizationKey = (token = "") => {
  const authToken = getAuthToken("", token);
  const validateAuthToken = checkValidAuthToken("", authToken);
  const headers = {
    "Content-Type": "application/json",
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  };
  return headers;
};

const AJAX = {
  post: async (url, data, formData = null, opts = {}, method) => {
    if (formData) {
      const formDataHeader = {
        headers: {
          ...fetchAuthorizationKey(),
          "Content-Type": "multipart/form-data",
        },
      };
      return axios.post(url, formData, formDataHeader);
    } else {
      return postApiCall(
        url,
        JSON.stringify(data),
        fetchAuthorizationKey(opts?.token),
        method
      );
    }
  },
  get: async (url, opts = {}) => {
    return getApiCall(url, fetchAuthorizationKey(opts?.token));
  },
  put: async (url, data, opts = {}) => {
    return putApiCall(
      url,
      JSON.stringify(data),
      fetchAuthorizationKey(opts?.token)
    );
  },
};

export default AJAX;
