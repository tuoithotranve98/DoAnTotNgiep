import * as actionTypes from "actions/actionTypes";

const initialState = {
  currentPage: 0,
  historyMainCards: [],
  totalItems: 0,
  totalPages: 0,
  historyMainCard: {},

  //state giao điện
  fetching: false,
  isEmpty: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_HISTORY_MAIN_CARDS:
      return {
        ...state,
        historyMainCards: action.historyMainCards,
        currentPage: action.currentPage,
        totalItems: action.totalItems,
        totalPages: action.totalPages,
      };
    case actionTypes.RECEIVE_HISTORY_MAIN_CARD:
      return {
        ...state,
        historyMainCard: action.historyMainCard,
      };
    case actionTypes.HISTORY_MAIN_CARD_FETCHING:
      return {
        ...state,
        fetching: action.bool,
      };
    case actionTypes.HISTORY_MAIN_CARD_IS_EMPTY:
      return {
        ...state,
        isEmpty: action.bool,
      };
    default:
      return state;
  }
};
