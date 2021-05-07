import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import List from "../List/List";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../styles/wrapper.scss";
import * as Icons from "pages/maintenancecard/commons/Icons";

function Wrapper(props) {
  const { customer, onGetCustomer, onChangeFilter } = props;
  const [selectedIds, setSelectedIds] = useState([]);

  const listRef = React.useRef();

  const resetSelected = () => {
    selectedMainCardIds([]);
  };

  const onClick = () => {
    listRef && listRef.current.onCheckAll();
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
  const isEmpty = customer && !customer.totalItems;
  if (isEmpty) {
    return (
      <div className="delivery-collations-list-wrapper">
        <div id="delivery-collations-filter-empty-wrapper">
          <div id="delivery-collations-filter-empty-text">
            Không có khách hàng
          </div>
          <div id="delivery-collations-filter-empty-icon">
            <Icons.OrderCollationFilterEmpty />
          </div>
        </div>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className="delivery-collations-list-wrapper">
        <Header onClick={onClick} checked={false} minus={false} child={child} />
        <List customer={customer} />
        <Footer
          onChangeFilter={onChangeFilter}
          customer={customer}
          resetSelected={resetSelected}
          isEmpty={isEmpty}
          onGetCustomer={onGetCustomer}
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
