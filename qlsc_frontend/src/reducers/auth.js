import * as actionTypes from "actions/actionTypes";
import storage from "../utils/storage";

const initState = {
  accessToken: null,
  user: {},
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_ACCESS_TOKEN:
      const tokenBefore = action.accessToken;
      const tokenAfter = tokenBefore.substr(7)
      storage.set("token", tokenAfter, false);
      return {
        ...state,
        accessToken: action.accessToken,
      };
    case actionTypes.RECEIVE_USER_ACCOUNT:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.account,
        },
      };
    default:
      return state;
  }
};

export default auth;
