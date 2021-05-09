import * as actionTypes from "actions/actionTypes";
import { API_USER } from "constants/api";
import { fetch } from "utils/fetchMiddleware";
import { toastError } from "../../../utils/toast";

export const getListStaff = (search = "", option = {}) => (
  dispatch,
  getState
) => {
  dispatch(updateStaffFetching(true));
  dispatch(getFilterStaffs(search, option))
    .then((json) => {
      const { users, currentPage, totalElement, totalPage } = json;
      if (users.length === 0) {
        dispatch(getStaffs(users, currentPage, totalElement, totalPage));
        dispatch(updateStaffFetching(false));
        dispatch(updateStaffIsEmpty(true));
      } else {
        dispatch(getStaffs(users, currentPage, totalElement, totalPage));
        dispatch(updateStaffFetching(false));
        dispatch(updateStaffIsEmpty(false));
      }
    })
    .catch((e) => {
      toastError("Có lỗi xảy ra khi lấy danh sách nhân viên");
      return;
    });
};

export const getFilterStaffs = (search = "", option = {}) => (
  dispatch,
  getState
) => {
  const filter = processOption(search, option);
  return dispatch(
    fetch(`${API_USER}/users${filter}`, {
      method: "GET",
    })
  )
    .then((json) => {
      return json;
    })
    .catch((e) => {
      console.log("e", e);
    });
};

export const getStaffById = (id) => (dispatch, getState) => {
  return dispatch(fetch(`${API_USER}/users/${id}`))
    .then((json) => {
      if (json) {
        dispatch(getStaff(json));
      }
      return json;
    })
    .catch((e) => {
      return e;
    });
};

export const updateStaff = (id, staff = {}) => (dispatch, getState) => {
  const endpoint = `${API_USER}/users/${id}`;
  return dispatch(
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(staff),
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

export const saveStaff = (staff = {}) => (dispatch, getState) => {
  const endpoint = `${API_USER}/users`;
  return dispatch(
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(staff),
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

const processOption = (search, option) => {
  let filter = "?";
  if (search) {
    filter += `search=${search}`;
  }
  if (option && option.page) {
    filter += `&page=${option.page}`;
  }
  return filter;
};

export const getStaff = (staff) => ({
  type: actionTypes.RECEIVE_STAFF,
  staff,
});

export const getStaffs = (users, currentPage, totalElement, totalPage) => ({
  type: actionTypes.RECEIVE_STAFFS,
  users,
  currentPage,
  totalElement,
  totalPage,
});

export const updateStaffIsEmpty = (bool) => ({
  type: actionTypes.STAFF_IS_EMPTY,
  bool,
});

export const updateStaffFetching = (bool) => ({
  type: actionTypes.STAFF_FETCHING,
  bool,
});
