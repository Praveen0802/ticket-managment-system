import { ADD_WALLET_POPUP,CONFIRM_PURCHASE_POPUP } from "./type";

export const updateWalletPopupFlag = (payload) => {
  return {
    type: ADD_WALLET_POPUP,
    payload,
  };
};

export const updateConfirmPurchasePopup = (payload) => {
  return {
    type: CONFIRM_PURCHASE_POPUP,
    payload,
  };
};