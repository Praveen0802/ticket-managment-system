import { parseCookie } from "@/utils/helperFunctions/cookie";
import axios from "axios";
import FormData from "form-data"; // Ensure this package is installed
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const method = req?.method;
  const { headers } = req;
  const apiName = req?.url.replace("/api/formPost/", "");

  const ROOT_URL = process.env.API_BASE_URL;
  const url = `${ROOT_URL}/${apiName}`.replace(/'/g, "");
  let formPayload = {};
  const form = formidable({ multiples: true });
  const parsedCookie = parseCookie(headers?.cookie);
  const authToken = decodeURIComponent(parsedCookie?.auth_token);
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing the files:", err);
      return res.status(500).json({ error: "Error parsing the files" });
    }

    const hasFiles = Object.keys(files).length > 0;

    // Create a new FormData instance
    const formData = new FormData();
    // Append fields to FormData
    Object.entries(fields).forEach(([key, [value]]) => {
      if (hasFiles) {
        formData.append(key, value);
      } else {
        formPayload[key] = value;
      }
    });

    // Iterate through files object
    if (hasFiles) {
      Object.entries(files).forEach(([key, [file]]) => {
        if (file.filepath) {
          // Use file.filepath to read the file as a stream
          formData.append(
            key,
            fs.createReadStream(file.filepath),
            file.originalFilename || "attachment"
          );
        } else {
          console.error("Invalid file stream:", file);
        }
      });
    }

    try {
      const response = await axios({
        url: url,
        method,
        data: hasFiles ? formData : formPayload,
        // ...(headers?.authorization && {
        //   headers: { Authorization: headers?.authorization },
        // }),
        ...(authToken && {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
      });

      return res.status(200).json(response?.data);
    } catch (err) {
      console.log("error", err);
      const statusCode = err?.response?.status || 500; // Use a default status code if err.response is undefined
      const responseData = err?.response?.data || {
        message: "Internal Server Error",
      }; // Use a default error message or data

      res.status(statusCode).json(responseData);
    }
  });
}
