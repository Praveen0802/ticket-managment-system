import { HIDE_PAGE_LOADER, SHOW_PAGE_LOADER } from "./types";

const initalState = {
  pageLoader: false,
};

const pageLoaderReducer = (state = initalState, action) => {
  switch (action.type) {
    case SHOW_PAGE_LOADER:
      return {
        ...state,
        pageLoader: true,
      };
    case HIDE_PAGE_LOADER:
      return {
        ...state,
        pageLoader: false,
      };
    default:
      return state;
  }
};

export default pageLoaderReducer;
