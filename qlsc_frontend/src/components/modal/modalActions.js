export const modalActionTypes = {
  modal_TOGGLE_MODAL: 'modal_TOGGLE_MODAL',
  modal_RESET_MODAL: 'modal_RESET_MODAL',
  modal_CLOSE_MODAL: 'modal_CLOSE_MODAL',
  modal_OPEN_MODAL: 'modal_OPEN_MODAL_VERSION2',
  modal_CALLING_API: 'modal_CALLING_API',
};

export const toggleModalAction = (modalName, data) => ({
  type: modalActionTypes.modal_TOGGLE_MODAL,
  modalName,
  data,
});

export const callingApiModalAction = (modalName, isCallingApi) => ({
  type: modalActionTypes.modal_CALLING_API,
  modalName,
  isCallingApi,
});

export const resetModal = () => ({
  type: modalActionTypes.modal_RESET_MODAL,
});

export const closeModal = (modalName, data) => ({
  type: modalActionTypes.modal_CLOSE_MODAL,
  modalName,
  data,
});

export const openModal = (modalName, data) => ({
  type: modalActionTypes.modal_OPEN_MODAL,
  modalName,
  data,
});
