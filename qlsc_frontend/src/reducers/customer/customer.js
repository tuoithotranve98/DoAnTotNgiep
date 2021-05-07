import * as actionTypes from 'actions/actionTypes';

const initialState = {
    currentPage: 0,
    customers: [],
    totalItems: 0,
    totalPages: 0,
    customer: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.RECEIVE_CUSTOMERS:
        return {
          ...state,
          customers: action.customers,
          currentPage: action.currentPage,
          totalItems: action.totalItems,
          totalPages: action.totalPages,
        }
      case actionTypes.RECEIVE_CUSTOMER:
        return {
          ...state,
          customer: action.customer,
        }
      default:
        return state
    }
  }