import { modalActionTypes } from './modalActions';

const defaultState = {
  show: false,
  isCallingApi: false,
  data: {},
};

const initState = {
  createProductModal: defaultState,
  deleteCustomer: defaultState,
  deleteStaffModal: defaultState,
  deleteProductModal: defaultState,
};

const modal = (state = initState, action) => {
  switch (action.type) {
    case modalActionTypes.modal_TOGGLE_MODAL:
      return {
        ...state,
        [action.modalName]: {
          ...state[action.modalName],
          show: state[action.modalName] && state[action.modalName].show ? !state[action.modalName].show : true,
          data: action.data,
        },
      };
    case modalActionTypes.modal_CALLING_API:
      return {
        ...state,
        [action.modalName]: {
          ...state[action.modalName],
          isCallingApi: action.isCallingApi,
        },
      };
    case modalActionTypes.modal_RESET_MODAL:
      return {
        ...initState,
        changeNewVersionModal: state.changeNewVersionModal,
      };
    case modalActionTypes.modal_CLOSE_MODAL:
      return {
        ...state,
        [action.modalName]: {
          ...state[action.modalName],
          show: false,
          data: action.data || {},
        },
      };
    case modalActionTypes.modal_OPEN_MODAL:
      return {
        ...state,
        [action.modalName]: {
          ...state[action.modalName],
          show: true,
          data: action.data,
        },
      };
    default:
      return state;
  }
};

export default modal;
