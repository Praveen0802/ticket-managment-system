export const readCookie = function (name) {
  const nameEQ = `${name}=`;
  const ca = typeof window === "object" ? document.cookie?.split(";") : "";
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);

    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const setCookie = (name, value, daysToExpire) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);
  const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieValue;
};

export const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim());
      return acc;
    }, {});

export const getMiddlewareCookieValue = (cookies, key) => {
  const cookiesObj = {};
  if (cookies) {
    cookies.split(";").map((cookie) => {
      const indexOfEqualTo = cookie.indexOf("=");
      const key = cookie.slice(0, indexOfEqualTo);
      const value = cookie.slice(indexOfEqualTo + 1);
      cookiesObj[key.trim()] = value.trim();
    });
  }
  return cookiesObj[key];
};
