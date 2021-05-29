import { API_MAINTENANCECARD, API_REPORT_V2 } from "constants/api";
import { fetch } from "utils/fetchMiddleware";
import { toastError } from "../../../utils/toast";

export const getDataForReport = (from, to) => (dispatch, getState) => {
  return dispatch(
    fetch(`${API_MAINTENANCECARD}/business/report?from=${from}&to=${to}`, {
      method: "GET",
    })
  )
    .then((json) => {
      return json;
    })
    .catch((e) => {
      toastError("Lỗi không xác định!");
    });
};

export const getDataForMainReport = (from, to) => (dispatch, getState) => {
  return dispatch(
    fetch(`${API_REPORT_V2}/maintenance_card_report?from=${from}&to=${to}`, {
      method: "GET",
    })
  )
    .then((json) => {
      return json;
    })
    .catch((e) => {
      toastError("Lỗi không xác định!");
    });
};

export const getDataForAccessoriesReport = (from, to) => (dispatch, getState) => {
  return dispatch(
    fetch(`${API_REPORT_V2}/accessories_report?from=${from}&to=${to}`, {
      method: "GET",
    })
  )
    .then((json) => {
      return json;
    })
    .catch((e) => {
      toastError("Lỗi không xác định!");
    });
};

export const getDataForStaffReport = (from, to) => (dispatch, getState) => {
  return dispatch(
    fetch(`${API_REPORT_V2}/staff_report?from=${from}&to=${to}`, {
      method: "GET",
    })
  )
    .then((json) => {
      return json;
    })
    .catch((e) => {
      toastError("Lỗi không xác định!");
    });
};
