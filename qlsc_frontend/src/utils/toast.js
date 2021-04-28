import { Slide, toast, Zoom } from 'react-toastify';

export function toastSuccess(message) {
  if (message) {
    toast.dark('' + message, { autoClose: 2000, transition: Slide });
  }
}
export function toastError(message) {
  if (message) {
    toast.error(message, { autoClose: 2000, transition: Slide });
  }
}
