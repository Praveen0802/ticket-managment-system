import { parseCookie } from "@/utils/helperFunctions/cookie";
import axios from "axios";

export default async function handler(req, res) {
  const method = req?.method;
  const { headers } = req;
  const apiName = req?.url.replace("/api/get/", "");
  const parsedCookie = parseCookie(headers?.cookie);
  const ROOT_URL = process.env.API_BASE_URL;
  const url = `${ROOT_URL}/${apiName}`.replace(/'/g, "");
  const authToken = decodeURIComponent(parsedCookie?.auth_token);
  await axios({
    url: url,
    method,
    ...(authToken && {
      headers: {
        Authorization: `Bearer ${authToken}`,
        domainkey: process.env.DOMAIN_KEY,
      },
    }),
  })
    .then((response) => {
      res.status(200).json(response?.data);
    })
    .catch(async (err) => {
      const statusCode = err?.response?.status || 500;
      const responseData = err?.response?.data || {
        message: "Internal Server Error",
      };
      res.status(statusCode).json(responseData);
    });
}
