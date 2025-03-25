import { ADD_WALLET_POPUP } from "./type";

export const updateWalletPopupFlag = (payload) => {
  return {
    type: ADD_WALLET_POPUP,
    payload,
  };
};
