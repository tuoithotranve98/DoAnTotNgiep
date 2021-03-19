import { combineReducers } from 'redux'
import product from './product/products'
import globalUI from './globalUI'
import modal from './../components/modal/modalReducer'
export default combineReducers({
  product,
  globalUI,
  modal,
})
