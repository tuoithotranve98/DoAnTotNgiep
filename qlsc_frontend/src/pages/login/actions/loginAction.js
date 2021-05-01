import * as actionTypes from "actions/actionTypes";
import { API_USER_AUTH } from "constants/api";
import { fetch } from "utils/fetchMiddleware";

export const login = (user = {}) => (dispatch, getState) => {
    const data = {
        username: user.email,
        password: user.password
    }
    return dispatch(
      fetch(API_USER_AUTH, {
        method: "POST",
        body: JSON.stringify(data),
      })
    )
      .then((json) => {
        return json;
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  };