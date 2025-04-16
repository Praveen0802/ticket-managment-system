import { ADD_WALLET_POPUP, CONFIRM_PURCHASE_POPUP } from "./type";

const initalState = {
  addWalletflag: false,
  confirmPurchasePopupFields: {
    flag: false,
    data: {},
  },
};

const CommonReducers = (state = initalState, action) => {
  switch (action.type) {
    case ADD_WALLET_POPUP:
      return {
        ...state,
        addWalletflag: action?.payload?.flag,
      };
    case CONFIRM_PURCHASE_POPUP:
      return {
        ...state,
        confirmPurchasePopupFields: action?.payload,
      };

    default:
      return state;
  }
};

export default CommonReducers;
