import * as actionTypes from "actions/actionTypes";
import { API_MAINTENANCECARD } from "constants/api";
import { fetch } from "utils/fetchMiddleware";
import { toastError } from "../../../utils/toast";

export const getListStaffHistoryMainCard = (search = "", option = {}) => (
  dispatch,
  getState
) => {
  dispatch(updateStaffHistoryMainCardFetching(true));
  dispatch(getFilterStaffHistoryMainCard(search, option))
    .then((json) => {
      const { staffHistoryMainCards, currentPage, totalItems, totalPages } = json;
      if (staffHistoryMainCards.length === 0) {
        dispatch(getStaffHistoryMainCards(staffHistoryMainCards, currentPage, totalItems, totalPages));
        dispatch(updateStaffHistoryMainCardFetching(false));
        dispatch(updateStaffHistoryMainCardIsEmpty(true));
      } else {
        dispatch(getStaffHistoryMainCards(staffHistoryMainCards, currentPage, totalItems, totalPages));
        dispatch(updateStaffHistoryMainCardFetching(false));
        dispatch(updateStaffHistoryMainCardIsEmpty(false));
      }
    })
    .catch((e) => {
      toastError("Có lỗi xảy ra khi lấy danh lịch sử sửa chữa");
      return;
    });
};
export const getFilterStaffHistoryMainCard = (search = "", option = {}) => (
  dispatch,
  getState
) => {
  const filter = processOption(search, option);
  return dispatch(
    fetch(`${API_MAINTENANCECARD}/users/maintenanceCards${filter}`, {
      method: "GET",
    })
  )
    .then((json) => {
      return json;
    })
    .catch((e) => {
      return e;
    });
};


const processOption = (search, option) => {
  let filter = "?";
  if (search) {
    filter += `code=${search}`;
  }
  if (option && option.page) {
    filter += `&page=${option.page}`;
    filter += `&id=${option.id}`;
  }
  return filter;
};


export const getStaffHistoryMainCards = (
  staffHistoryMainCards,
  currentPage,
  totalItems,
  totalPages
) => ({
  type: actionTypes.RECEIVE_STAFF_HISTORY_MAIN_CARDS,
  staffHistoryMainCards,
  currentPage,
  totalItems,
  totalPages,
});

export const updateStaffHistoryMainCardIsEmpty = (bool) => ({
  type: actionTypes.STAFF_HISTORY_MAIN_CARD_IS_EMPTY,
  bool,
});

export const updateStaffHistoryMainCardFetching = (bool) => ({
  type: actionTypes.STAFF_HISTORY_MAIN_CARD_FETCHING,
  bool,
});
