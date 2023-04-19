// export { HttpStatusCodes } from "./httpStatusCodes";

import { MenuItemType } from "$lib/models/db/menu.model";

export const getCookieValue = (name: string, cookie: string | null) =>
  cookie?.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || null;

export const sleep = async (t: number) => new Promise((r) => setTimeout(r, t));

export const withTimeout = (p: object, msg = "time out", ms = 1000) =>
  Promise.race([p, new Promise((_, r) => setTimeout(() => r(msg), ms))]);

// export const decodeJwt = (token: string) => jwt.decode(token); // needs polyfills

export interface JwtPayload {
  uid: string;
  role: string;
  iat: number;
  exp: number;
}

export const decodeJwt = (token: string): JwtPayload => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window.atob(base64).split("").map((c) => {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""),
  );
  return JSON.parse(jsonPayload) as JwtPayload;
};

export const prettyPrintMenuItemType = (itemType: MenuItemType) => {
  switch (itemType) {
    case MenuItemType.veg:
      return "Vegetarian";
    case MenuItemType.halal:
      return "Halal";
    case MenuItemType.nonVeg:
      return "Non Vegetarian";
    default:
      return "Not Specified";
  }
}