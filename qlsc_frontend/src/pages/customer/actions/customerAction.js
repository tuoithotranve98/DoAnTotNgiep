import * as actionTypes from "actions/actionTypes";
import { API_CUSTOMER } from "constants/api";
import { fetch } from "utils/fetchMiddleware";

export const getListCustomer = (options = {}) => (dispatch, getState) => {
  return dispatch(fetch(`${API_CUSTOMER}/customers`))
    .then((json) => {
      if (json && json.customers) {
        const { customers, currentPage, totalItems, totalPages } = json;
        dispatch(getCustomers(customers, currentPage, totalItems, totalPages));
      }
    })
    .catch((e) => {
      return e;
    });
};

export const getCustomerById = (id) => (dispatch, getState) => {
  return dispatch(fetch(`${API_CUSTOMER}/customers/${id}`))
    .then((json) => {
      if (json) return json;
    })
    .catch((e) => {
      return e;
    });
};

export const updateCustomer = (id, customer = {}) => (dispatch, getState) => {
  const endpoint = `${API_CUSTOMER}/customers/${id}`;
  return dispatch(
    fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(customer),
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

export const saveCustomer = (customer = {}) => (dispatch, getState) => {
  const endpoint = `${API_CUSTOMER}/customers`;
  return dispatch(
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(customer),
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

export const getCustomers = (
  customers,
  currentPage,
  totalItems,
  totalPages
) => ({
  type: actionTypes.GET_CUSTOMERS,
  customers,
  currentPage,
  totalItems,
  totalPages,
});
