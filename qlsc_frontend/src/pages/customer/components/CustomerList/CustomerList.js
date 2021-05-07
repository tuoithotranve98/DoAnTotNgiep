/* eslint-disable no-shadow */
import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import "./styles.scss";
import debounce from "utils/debounce";
import CustomerListBody from "./CustomerListBody/CustomerListBody";
import CustomerListHeader from "./CustomerHeader/CustomerListHeader";
import { getListCustomer } from "../../actions/customerAction";

const initialState = {
  page: 1,
  size: 10,
  nameField: "",
  order: "",
};
function CustomerList(props) {
  const { onGetCustomer } = props;
  const [filter, setFilter] = useState(initialState);
  const [search, setSearch] = useState("");

  useEffect(() => {
    onGetCustomer(search, filter);
  }, []);

  useEffect(() => {
    onGetCustomer(search, filter);
  }, [filter]);

  const handleInputOnchange = (e) => {
    e.persist();
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  const onChangeFilter = (type, value) => {
    setFilter({
      ...filter,
      [type]: value,
    });
  }

  const debounceSearch = useCallback(
    debounce((nextValue) => onGetCustomer(nextValue, filter), 200),
    []
  );

  return (
    <div className="customer-screen-wrapper">
      <CustomerListHeader />
      <CustomerListBody
        search={search}
        onGetCustomer={onGetCustomer}
        handleInputOnchange={handleInputOnchange}
        onChangeFilter={onChangeFilter}
      />
    </div>
  );
}
CustomerList.defaultProps = {};

const mapDispatchToProps = (dispatch) => ({
  onGetCustomer: (search, option) => dispatch(getListCustomer(search, option)),
});

export default React.memo(connect(null, mapDispatchToProps)(CustomerList));
