import { ADD_WALLET_POPUP } from "./type";

const initalState = {
  addWalletflag: false,
};

const CommonReducers = (state = initalState, action) => {
  switch (action.type) {
    case ADD_WALLET_POPUP:
      return {
        ...state,
        addWalletflag: action?.payload?.flag,
      };

    default:
      return state;
  }
};

export default CommonReducers;
