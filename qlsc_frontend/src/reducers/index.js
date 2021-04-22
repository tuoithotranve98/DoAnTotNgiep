import { combineReducers } from 'redux';
import product from './product/products';
import globalUI from './globalUI';
import modal from './../components/modal/modalReducer';
import customer from './customer/customer';
import locations from './locations/locations';
import auth from './auth';

export default combineReducers({
  auth,
  product,
  globalUI,
  modal,
  customer,
  locations,
})
