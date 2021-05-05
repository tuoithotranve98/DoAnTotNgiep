/* eslint-disable no-shadow */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./styles.scss";
import CustomerListBody from "./CustomerListBody/CustomerListBody";
import CustomerListHeader from "./CustomerHeader/CustomerListHeader";
import { getListCustomer } from '../../actions/customerAction';
function CustomerList(props) {

  useEffect(() => {
    props.onGetCustomer();
  }, []);

  return (
    <div className="customer-screen-wrapper">
      <CustomerListHeader />
      <CustomerListBody />
    </div>
  );
}
CustomerList.defaultProps = {};

const mapDispatchToProps = (dispatch) => ({
  onGetCustomer: (key, page, size, name, order) =>
    dispatch(getListCustomer(key, page, size, name, order)),
});

export default React.memo(connect(null, mapDispatchToProps)(CustomerList));
