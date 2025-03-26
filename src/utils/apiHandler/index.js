import axios from "axios";
import { checkValidAuthToken, getAuthToken } from "../helperFunctions";
import {
  getApiCall,
  postApiCall,
  formPostAPICall,
  putApiCall,
} from "./apiCall";

export const fetchAuthorizationKey = (token = "") => {
  const authToken = getAuthToken("", token);
  const validateAuthToken = checkValidAuthToken("", authToken);
  const headers = {
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  };
  return headers;
};

const AJAX = {
  post: async (url, data, formData = null, opts = {}, method) => {
    if (formData) {
      // const modifiedUrl = `${process.env.API_BASE_URL}${url}`;
      const formDataHeader = {
        ...fetchAuthorizationKey(),
        "Content-Type": "multipart/form-data",
      };
      return formPostAPICall(url, formData, formDataHeader);
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
