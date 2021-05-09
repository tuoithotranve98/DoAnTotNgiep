import * as actionTypes from "actions/actionTypes";
import { API_PRODUCT, API_IMAGE } from "constants/api";
import { fetch } from "utils/fetchMiddleware";
import callApi from "utils/callApi";

export const getProductService = (search = "", option = {}) => (
  dispatch,
  getState
) => {
  dispatch(updateProductFetching(true));
  dispatch(getFilterProductService(search, option))
    .then((json) => {
      const { productServices, currentPage, totalItem, totalPage } = json;
      if (productServices.length === 0) {
        dispatch(getProductServices(productServices, currentPage, totalItem, totalPage));
        dispatch(updateProductFetching(false));
        dispatch(updateProductIsEmpty(true));
      } else {
        dispatch(getProductServices(productServices, currentPage, totalItem, totalPage));
        dispatch(updateProductFetching(false));
        dispatch(updateProductIsEmpty(false));
      }
    })
    .catch((e) => {
      console.log("Có lỗi xảy ra khi lấy danh sách sản phẩm");
    });
};

export const getFilterProductService = (search = "", option = {}) => (
  dispatch,
  getState
) => {
  const filter = processOption(search, option);
  return dispatch(
    fetch(`${API_PRODUCT}/products${filter}`, {
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

export const upLoadImage = (file) => (dispatch, getState) => {
  let formData = new FormData();
  formData.append("file", file);
  const endpoint = `${API_IMAGE}/uploadFile`;
  const options = {
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return callApi(endpoint, options)
    .then((json) => {
      return json;
    })
    .catch((e) => {
      console.error(e);
      return e;
    });
};

export const getProductServiceById = (id) => (dispatch, getState) => {
  return dispatch(fetch(`${API_PRODUCT}/products/${id}`))
    .then((json) => {
      if (json && json.type === 1) {
        dispatch(getProduct(json));
      }
      if (json && json.type === 2) {
        dispatch(getService(json));
      }
      return json;
    })
    .catch((e) => {
      return e;
    });
};

export const updateProductService = (id, productSerice = {}) => (
  dispatch,
  getState
) => {
  const endpoint = `${API_PRODUCT}/products/${id}`;
  return dispatch(
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(productSerice),
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

export const saveProductService = (productSerice = {}) => (
  dispatch,
  getState
) => {
  const endpoint = `${API_PRODUCT}/products`;
  return dispatch(
    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(productSerice),
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

export const getProduct = (product) => ({
  type: actionTypes.RECEIVE_PRODUCT,
  product,
});

export const getService = (service) => ({
  type: actionTypes.RECEIVE_SERVICE,
  service,
});

export const getProductServices = (
  productServices,
  currentPage,
  totalItem,
  totalPage
) => ({
  type: actionTypes.RECEIVE_PRODUCT_SERVICE,
  productServices,
  currentPage,
  totalItem,
  totalPage,
});

export const updateProductIsEmpty = (bool) => ({
  type: actionTypes.PRODUCT_IS_EMPTY,
  bool,
});

export const updateProductFetching = (bool) => ({
  type: actionTypes.PRODUCT_FETCHING,
  bool,
});
