import * as actionTypes from "actions/actionTypes";
import { API_CUSTOMER } from "constants/api";
import { fetch } from "utils/fetchMiddleware";

export const getCity = () => (dispatch) => {
  const endpoint = `${API_CUSTOMER}/provinces`;
  dispatch(fetch(endpoint)).then((json) => {
    if (json) dispatch(receiveCity(json));
  });
};

export const getWard = (districtId) => (dispatch) => {
  const endPoint = `${API_CUSTOMER}/wards?districtId=${districtId}`;
  return dispatch(fetch(endPoint)).then((res) => {
    dispatch(positionCallApi(true));
    if (res) {
      dispatch(receiveWard(res));
      dispatch(positionCallApi(null));
    }
    return res;
  });
};

export const positionCallApi = (isCallingApi) => ({
  type: actionTypes.CITY_CALLING_API,
  isCallingApi,
});

export const receiveCity = (data) => ({
  type: actionTypes.LOCATION_RECEIVE_CITY,
  data,
});

export const receiveWard = (data) => ({
  type: actionTypes.LOCATION_RECEIVE_WARD,
  data,
});
