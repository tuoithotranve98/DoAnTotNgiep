import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import List from "../List/List";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../styles/wrapper.scss";
import * as Icons from "pages/customer/commons/Icons";

function Wrapper(props) {
  const { historyMainCard, onGetHistoryMainCard, onChangeFilter } = props;
  console.log("historyMainCard", historyMainCard);
  const [selectedIds, setSelectedIds] = useState([]);
  const { historyMainCards } = historyMainCard
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
  const isEmpty = historyMainCard.isEmpty
  const fetching = historyMainCard.fetching
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
          checked={selectedIds.length && selectedIds.length === historyMainCards.length}
          minus={selectedIds.length && selectedIds.length < historyMainCards.length}
          child={child} />
        <List
          ref={listRef}
          historyMainCard={historyMainCard}
          fetching={fetching}
          isEmpty={isEmpty}
          onCheckBoxClick={onCheckBoxClick}
          selectedIds={selectedIds}
          onCheckBoxListClick={onCheckBoxListClick}
        />
        <Footer
          onChangeFilter={onChangeFilter}
          historyMainCard={historyMainCard}
          resetSelected={resetSelected}
          isEmpty={isEmpty}
          onGetHistoryMainCard={onGetHistoryMainCard}
          fetching={fetching}
        />
      </div>
    </React.Fragment>
  );
}
Wrapper.defaultProps = {
  selectedIds: [],
  historyMainCard: [],
};

const mapStateToProps = (state) => {
  const { historyMainCard } = state;
  return {
    historyMainCard,
  };
};

export default withRouter(connect(mapStateToProps, null)(Wrapper));
