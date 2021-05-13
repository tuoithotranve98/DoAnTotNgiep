import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import List from "../List/List";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../styles/wrapper.scss";
import * as Icons from "pages/customer/commons/Icons";

function Wrapper(props) {
  const { staffHistoryMainCard, onGetStaffHistoryMainCard, onChangeFilter } = props;
  const [selectedIds, setSelectedIds] = useState([]);
  const { staffHistoryMainCards } = staffHistoryMainCard
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
          Đã chọn ({selectedIds.length} đơn hàng)
        </span>
      </div>
    );
  };

  const child = renderCheckInfo();
  const isEmpty = staffHistoryMainCard.isEmpty
  const fetching = staffHistoryMainCard.fetching
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
        <Header
          onClick={onClick}
          checked={selectedIds.length && selectedIds.length === staffHistoryMainCards.length}
          minus={selectedIds.length && selectedIds.length < staffHistoryMainCards.length}
          child={child} />
        <List
          ref={listRef}
          staffHistoryMainCard={staffHistoryMainCard}
          fetching={fetching}
          isEmpty={isEmpty}
          onCheckBoxClick={onCheckBoxClick}
          selectedIds={selectedIds}
          onCheckBoxListClick={onCheckBoxListClick}
        />
        <Footer
          onChangeFilter={onChangeFilter}
          staffHistoryMainCard={staffHistoryMainCard}
          resetSelected={resetSelected}
          isEmpty={isEmpty}
          onGetStaffHistoryMainCard={onGetStaffHistoryMainCard}
          fetching={fetching}
        />
      </div>
    </React.Fragment>
  );
}
Wrapper.defaultProps = {
  selectedIds: [],
  staffHistoryMainCard: [],
};

const mapStateToProps = (state) => {
  const { staffHistoryMainCard } = state;
  return {
    staffHistoryMainCard,
  };
};

export default withRouter(connect(mapStateToProps, null)(Wrapper));
