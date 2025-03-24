import { readCookie } from "./cookie";

export function formatDate(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
}

export const convertSnakeCaseToCamelCase = (snakeCase) => {
  // Split the string by underscores
  const words = snakeCase.split("_");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  // Join the words with spaces
  return capitalizedWords.join(" ");
};

export const nextRedirect = (pathName = "login") => {
  return {
    redirect: {
      permanent: false,
      destination: `/${pathName}`,
    },
  };
};

export const getAuthToken = (context = null, token) => {
  const isClient = typeof window != "undefined";
  return token
    ? token
    : isClient
    ? readCookie("auth_token")
    : context?.req?.cookies?.auth_token;
};

export const currentTimeEpochTimeInMilliseconds = () => {
  return new Date().getTime();
};

export const checkValidAuthToken = (context = null, authToken) => {
  const isClient = typeof window != "undefined";
  const token = authToken
    ? authToken
    : isClient
    ? readCookie("auth_token")
    : context?.req?.cookies?.auth_token;
  console.log(token, "token");
  const fetchAuthTokenTime = isClient
    ? readCookie("auth_token_validity")
    : context?.req?.cookies?.auth_token_validity;
  console.log(fetchAuthTokenTime, "111token");
  if (!token || !fetchAuthTokenTime) return false;

  const currentTimeEpoch = currentTimeEpochTimeInMilliseconds();
  const tokenTimeEpoch = Number(fetchAuthTokenTime);
  console.log(tokenTimeEpoch, "111211token");
  const timeDiffBolean = tokenTimeEpoch > currentTimeEpoch - 3600000;
  return timeDiffBolean;
};

export const clearUserCookie = async () => {
  const cookiesToDelete = ["auth_token", "sessionData"];
  const deleteCookieStrings = cookiesToDelete.map(
    (cookieName) =>
      `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=Strict`
  );
  return deleteCookieStrings;
};

export function convertDataToWalletHistoryFormat(originalData) {
  // Group data by month
  const groupedByMonth = {};

  originalData.forEach((item) => {
    // Extract date from created_date_time
    const date = new Date(item.created_date_time);
    const monthYear = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    if (!groupedByMonth[monthYear]) {
      groupedByMonth[monthYear] = [];
    }

    // Format the date to "MMM D, YYYY" format
    const formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Add the item to the respective month group
    groupedByMonth[monthYear].push({
      orderId: item.id.toString(),
      reference: item.reference_no,
      event: item.description.substring(0, 15) + "...", // Truncated for brevity
      netAmount: item.price_with_currency,
      deductions: "-", // No deduction info in original data
      payoutValue: item.price_with_currency, // Using same amount since no deduction
      payoutDate: formattedDate,
      ticket: item.payment_transfer_by,
      status: item.status === 1 ? "Paid" : "Pending",
      eye: true,
    });
  });

  // Convert to the required format
  const walletHistory = Object.keys(groupedByMonth).map((monthYear) => {
    return {
      title: monthYear,
      headers: [
        "Order ID",
        "Payment Reference",
        "Event",
        "Net Amount",
        "Deductions",
        "Payout Value",
        "Payout Initiated Date",
        "Ticket",
        "Status",
        "",
      ],
      data: groupedByMonth[monthYear],
    };
  });

  return walletHistory;
}

export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
};
