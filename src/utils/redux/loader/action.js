import { HIDE_PAGE_LOADER, SHOW_PAGE_LOADER } from "./types";

export const showpageLoader = () => {
  return { type: SHOW_PAGE_LOADER };
};

export const hidepageLoader = () => {
  return { type: HIDE_PAGE_LOADER };
};
