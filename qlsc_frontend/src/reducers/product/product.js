import * as actionTypes from "actions/actionTypes";

const initState = {
  currentPage: 0,
  productSerives: [],
  totalItem: 0,
  totalPage: 0,
  product: {},
  service: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.RECEIVE_PRODUCT_SERVICE:
      return {
        ...state,
        productSerives: action.users,
        currentPage: action.currentPage,
        totalItem: action.totalItem,
        totalPage: action.totalPage,
      };
    case actionTypes.RECEIVE_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    case actionTypes.RECEIVE_SERVICE:
      return {
        ...state,
        service: action.service,
      };
    default:
      return state;
  }
};
