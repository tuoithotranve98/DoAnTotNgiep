import * as actionTypes from "actions/actionTypes";
import storage from "../utils/storage";

const initState = {
  accessToken: null,
  user: {},
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_ACCESS_TOKEN:
      const token = action.accessToken;
      storage.set("token", token, false);
      return {
        ...state,
        accessToken: token,
      };
    case actionTypes.RECEIVE_USER_ACCOUNT:
      const tenant = action.account.tenant;
      storage.set("tenantId", tenant.id, false);
      storage.set("user", JSON.stringify(action.account), false);
      return {
        ...state,
        user: {
          ...state.user,
          ...action.account,
        },
      };
    case actionTypes.LOGOUT:
      storage.clear();
      return {
        accessToken: null,
        user: null,
      };
    default:
      return state;
  }
};

export default auth;
