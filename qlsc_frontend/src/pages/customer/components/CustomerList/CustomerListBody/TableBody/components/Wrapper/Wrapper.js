import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import List from "../List/List";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../styles/wrapper.scss";
import imgNoCustomer from 'images/NoCustomer.png';

function Wrapper(props) {
  const { customer, onGetCustomer, onChangeFilter, filter } = props;
  const [selectedIds, setSelectedIds] = useState([]);
  const { customers } = customer
  const listRef = React.useRef();

  const onClick = () => {
    listRef && listRef.current.onCheckAll();
  };

  const onCheckBoxClick = (id) => {
    setSelectedIds(selectedIds.includes(id) ? selectedIds.filter(it => it !== id) : selectedIds.concat(id));
  };

  const resetSelected = () => {
    setSelectedIds([]);
  };

  const onCheckBoxListClick = (ids) => {
    setSelectedIds(ids);
  };

  const renderCheckInfo = () => {
    return (
      <div className="count-check">
        <span className="details">
          Đã chọn ({selectedIds.length} khách hàng)
        </span>
      </div>
    );
  };

  const child = renderCheckInfo();
  const isEmpty = customer.isEmpty
  const fetching = customer.fetching
  if (isEmpty) {
    return (
      <div className="delivery-collations-list-wrapper">
        <div id="delivery-collations-filter-empty-wrapper" style={{ alignItems: 'center'}}>
          <div id="delivery-collations-filter-empty-text">
            Chưa có khách hàng
          </div>
          <div id="delivery-collations-filter-empty-icon">
            <img style={{ height: '100%', marginTop: 30}} src={imgNoCustomer} alt=""></img>
          </div>
        </div>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className="delivery-collations-list-wrapper">
        <Header
          onClick={onClick}
          checked={selectedIds.length && selectedIds.length === customers.length}
          minus={selectedIds.length && selectedIds.length < customers.length}
          child={child}
          selectedIds={selectedIds}
          />
        <List
          ref={listRef}
          customer={customer}
          fetching={fetching}
          isEmpty={isEmpty}
          onCheckBoxClick={onCheckBoxClick}
          selectedIds={selectedIds}
          onCheckBoxListClick={onCheckBoxListClick}
        />
        <Footer
          size={filter.size}
          onChangeFilter={onChangeFilter}
          customer={customer}
          resetSelected={resetSelected}
          isEmpty={isEmpty}
          onGetCustomer={onGetCustomer}
          fetching={fetching}
        />
      </div>
    </React.Fragment>
  );
}
Wrapper.defaultProps = {
  selectedIds: [],
  customer: [],
};

const mapStateToProps = (state) => {
  const { customer } = state;
  return {
    customer,
  };
};

export default withRouter(connect(mapStateToProps, null)(Wrapper));
