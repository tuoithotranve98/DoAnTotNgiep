import * as actionTypes from "actions/actionTypes";

const initialState = {
  currentPage: 0,
  staffHistoryMainCards: [],
  totalItems: 0,
  totalPages: 0,
  staffHistoryMainCard: {},

  //state giao điện
  fetching: false,
  isEmpty: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.RECEIVE_STAFF_HISTORY_MAIN_CARDS:
      console.log("aaaaaaaaaaa", action);
      return {
        ...state,
        staffHistoryMainCards: action.staffHistoryMainCards,
        currentPage: action.currentPage,
        totalItems: action.totalItems,
        totalPages: action.totalPages,
      };
    case actionTypes.RECEIVE_STAFF_HISTORY_MAIN_CARD:
      return {
        ...state,
        staffHistoryMainCard: action.staffHistoryMainCard,
      };
    case actionTypes.STAFF_HISTORY_MAIN_CARD_FETCHING:
      return {
        ...state,
        fetching: action.bool,
      };
    case actionTypes.STAFF_HISTORY_MAIN_CARD_IS_EMPTY:
      return {
        ...state,
        isEmpty: action.bool,
      };
    default:
      return state;
  }
};
