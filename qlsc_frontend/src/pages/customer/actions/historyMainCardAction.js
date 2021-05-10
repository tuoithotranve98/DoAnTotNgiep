import * as actionTypes from "actions/actionTypes";
import { API_MAINTENANCECARD } from "constants/api";
import { fetch } from "utils/fetchMiddleware";
import { toastError } from "../../../utils/toast";

export const getListHistoryMainCard = (search = "", option = {}) => (
  dispatch,
  getState
) => {
  dispatch(updateHistoryMainCardFetching(true));
  dispatch(getFilterHistoryMainCard(search, option))
    .then((json) => {
      const { historyMainCards, currentPage, totalItems, totalPages } = json;
      if (historyMainCards.length === 0) {
        dispatch(getHistoryMainCards(historyMainCards, currentPage, totalItems, totalPages));
        dispatch(updateHistoryMainCardFetching(false));
        dispatch(updateHistoryMainCardIsEmpty(true));
      } else {
        dispatch(getHistoryMainCards(historyMainCards, currentPage, totalItems, totalPages));
        dispatch(updateHistoryMainCardFetching(false));
        dispatch(updateHistoryMainCardIsEmpty(false));
      }
    })
    .catch((e) => {
      toastError("Có lỗi xảy ra khi lấy danh lịch sử sửa chữa");
      return;
    });
};
export const getFilterHistoryMainCard = (search = "", option = {}) => (
  dispatch,
  getState
) => {
  const filter = processOption(search, option);
  return dispatch(
    fetch(`${API_MAINTENANCECARD}/maintenanceCards/customer${filter}`, {
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

export const getHistoryMainCardById = (id) => (dispatch, getState) => {
  return dispatch(fetch(`${API_HISTORY_MAIN_CARD}/historyMainCard/${id}`))
    .then((json) => {
      if (json) {
        dispatch(getHistoryMainCard(json));
      }
      return json;
    })
    .catch((e) => {
      return e;
    });
};

export const updateHistoryMainCard = (id, historyMainCard = {}) => (dispatch, getState) => {
  const endpoint = `${API_HISTORY_MAIN_CARD}/historyMainCard/${id}`;
  return dispatch(
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(historyMainCard),
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

export const saveHistoryMainCard = (historyMainCard = {}) => (dispatch, getState) => {
  const endpoint = `${API_HISTORY_MAIN_CARD}/historyMainCard`;
  return dispatch(
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(historyMainCard),
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
    filter += `&id=${option.id}`;
  }
  return filter;
};

export const getHistoryMainCard = (historyMainCard) => ({
  type: actionTypes.RECEIVE_HISTORY_MAIN_CARD,
  historyMainCard,
});

export const getHistoryMainCards = (
  historyMainCards,
  currentPage,
  totalItems,
  totalPages
) => ({
  type: actionTypes.RECEIVE_HISTORY_MAIN_CARDS,
  historyMainCards,
  currentPage,
  totalItems,
  totalPages,
});

export const updateHistoryMainCardIsEmpty = (bool) => ({
  type: actionTypes.HISTORY_MAIN_CARD_IS_EMPTY,
  bool,
});

export const updateHistoryMainCardFetching = (bool) => ({
  type: actionTypes.HISTORY_MAIN_CARD_FETCHING,
  bool,
});
