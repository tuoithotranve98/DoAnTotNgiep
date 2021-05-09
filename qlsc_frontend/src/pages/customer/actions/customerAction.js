import * as actionTypes from "actions/actionTypes";
import { API_CUSTOMER } from "constants/api";
import { fetch } from "utils/fetchMiddleware";

export const getListCustomer = (search = '', option = {}) => (dispatch, getState) => {
  dispatch(getFilterCustomers(search, option)).then((json)=>{
    const { customers, currentPage, totalItems, totalPages } = json;
    dispatch(getCustomers(customers, currentPage, totalItems, totalPages));
  }).catch((e) =>{
    console.log("Có lỗi xảy ra khi lấy danh sách sản phẩm");
  })
};
export const getFilterCustomers = (search = '', option = {}) => (dispatch, getState) => {
  const filter = processOption(search, option);
  return dispatch(fetch(`${API_CUSTOMER}/customers${filter}`, {
    method: 'GET',
  }))
    .then((json) => {
      return json
    })
    .catch((e) => {
      return e;
    });
};

export const getCustomerById = (id) => (dispatch, getState) => {
  return dispatch(fetch(`${API_CUSTOMER}/customers/${id}`))
    .then((json) => {
      if (json) {
        dispatch(getCustomer(json));
      }
      return json;
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

const processOption = (search, option) => {
  let filter = '?';
  if (search) {
    filter += `search=${search}`
  }
  if (option && option.page) {
    filter += `&page=${option.page}`;
  }
  return filter;
}

export const getCustomer = (customer) => ({
  type: actionTypes.RECEIVE_CUSTOMER,
  customer,
});

export const getCustomers = (
  customers,
  currentPage,
  totalItems,
  totalPages
) => ({
  type: actionTypes.RECEIVE_CUSTOMERS,
  customers,
  currentPage,
  totalItems,
  totalPages,
});
