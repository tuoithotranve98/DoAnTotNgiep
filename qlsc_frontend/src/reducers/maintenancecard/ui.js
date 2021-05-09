import * as actionTypes from 'actions/actionTypes';

const initState = {
  showTable: false,
  fetching: false,
  isEmpty: false,
  showModal: false,
};
export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.MAIN_CARD_FETCHING:
      return {
        ...state,
        fetching: action.bool,
      };
    case actionTypes.MAIN_CARD_IS_EMPTY:
      return {
        ...state,
        isEmpty: action.bool,
      };
    case actionTypes.SHOW_MODAL_MAIN_CARD:
      return {
        ...state,
        showModal: action.show,
      };
    default:
      return state;
  }
};
