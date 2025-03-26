import { getMiddlewareCookieValue } from "@/utils/helperFunctions/cookie";
import { NextResponse } from "next/server";
import {
  checkAuthTokenValidationMiddleWare,
  currentTimeEpochTimeInMilliseconds,
} from "./utils/helperFunctions";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const authToken = decodeURIComponent(
    getMiddlewareCookieValue(request.headers.get("cookie"), "auth_token")
  );
  const authTokenValidity = getMiddlewareCookieValue(
    request.headers.get("cookie"),
    "auth_token_validity"
  );
  const validateAuthToken = await checkAuthTokenValidationMiddleWare(
    authToken,
    authTokenValidity
  );
  console.log("validateAuthToken", authToken, validateAuthToken);
  if (validateAuthToken?.error) {
    const response = NextResponse.redirect(new URL(`/login`, request.url));
    response.cookies.set("auth_token", "");
    response.cookies.set("auth_token_validity", "");
    return response;
  }

  if (pathname.includes("/api")) {
    try {
      if (!validateAuthToken) {
        if (pathname.includes("/auth/login")) {
          return;
        } else {
          return NextResponse.redirect(new URL(`/login`, request.url));
        }
      }
      if (validateAuthToken) {
        if (validateAuthToken?.token) {
          const response = NextResponse.next();
          response.cookies.set("auth_token", validateAuthToken.token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            // maxAge: 3600 // Optional: set expiration
          });
          response.cookies.set(
            "auth_token_validity",
            currentTimeEpochTimeInMilliseconds().toString()
          );
          return response;
        } else {
          return;
        }
      }
    } catch (error) {
      console.error("Token validation error:", error);
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }

  // if (pathname.startsWith("/login")) {
  if (!authToken || !authTokenValidity) {
    if (pathname.startsWith("/login")) {
      return;
    } else {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  } else if (!validateAuthToken) {
    const response = NextResponse.redirect(new URL(`/login`, request.url));
    response.cookies.set("auth_token", "");
    response.cookies.set("auth_token_validity", "");
    return response;
  } else if (validateAuthToken) {
    if (validateAuthToken?.token) {
      const response = NextResponse.next();
      response.cookies.set("auth_token", validateAuthToken?.token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        // maxAge: 3600 // Optional: set expiration
      });
      response.cookies.set(
        "auth_token_validity",
        currentTimeEpochTimeInMilliseconds().toString()
      );
      return response;
    } else {
      return;
    }
  }
  // }

  // try {
  //   if (validateAuthToken) {
  //     if (validateAuthToken?.token) {
  //       const response = NextResponse.next();
  //       response.cookies.set("auth_token", validateAuthToken.token);
  //       response.cookies.set(
  //         "auth_token_validity",
  //         currentTimeEpochTimeInMilliseconds().toString()
  //       );
  //       return response;
  //     }
  //   } else if (!validateAuthToken) {
  //     return NextResponse.redirect(new URL(`/login`, request.url));
  //   }
  // } catch (error) {
  //   console.error("Token validation error:", error);
  //   return NextResponse.redirect(new URL(`/login`, request.url));
  // }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - serviceworker.js (service worker file)
     * - manifest.json (web app manifest file)
     */
    "/((?!_next/static|_next/image|favicon.ico|serviceworker.js|manifest.json).*)",
  ],
};
