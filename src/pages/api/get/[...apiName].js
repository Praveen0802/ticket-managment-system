import axios from "axios";

export default async function handler(req, res) {
  const method = req?.method;
  const { headers } = req;
  const apiName = req?.url.replace("/api/get/", "");
  const ROOT_URL = process.env.API_BASE_URL;
  const url = `${ROOT_URL}/${apiName}`.replace(/'/g, "");

  await axios({
    url: url,
    method,
    ...(headers?.authorization && {
      headers: { Authorization: headers?.authorization },
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
