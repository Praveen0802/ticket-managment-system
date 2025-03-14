const { CURRENT_USER } = require("./types");

const initialValue = {
  currentUser: {},
};

const CurrentUserReducer = (state = initialValue, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: { ...state?.currentUser, ...action?.data },
      };
    default:
      return state;
  }
};

export default CurrentUserReducer;
