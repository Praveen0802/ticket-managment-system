import axios from "axios";

const postApiCall = async (url, payload, headers = {}, method) => {
  try {
    const response = await axios({
      url: `/api/post${url}`,
      method: method ?? "POST",
      data: { payload },
      headers: {
        ...headers,
      },
    });
    return response;
  } catch (err) {
    console.error("API call failed:", {
      url: `/api/post/${url}`,
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });
    throw err;
  }
};

const formPostAPICall = async (url, payload, headers = {}) => {
  try {
    const response = await axios({
      url: `/api/formPost${url}`,
      method: "POST",
      data: payload,
      headers: {
        ...headers,
      },
    });
    return response;
  } catch (err) {
    console.error("API call failed:", {
      url: `/api/post/${url}`,
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });
    throw err;
  }
};

const getApiCall = async (url, headers = {}, config = {}) => {
  try {
    const response = await axios({
      url: `/api/get/${url}`,
      method: "GET",
      headers: {
        ...headers,
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
};

const putApiCall = async (url, payload, header = {}) => {
  const { headers } = header;
  try {
    const response = await axios({
      url: ` /api/post/${url}`,
      method: "PUT",
      data: { payload },
      headers: {
        ...headers,
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export { postApiCall, getApiCall, putApiCall, formPostAPICall };
