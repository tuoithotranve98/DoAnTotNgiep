import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import List from "../List/List";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../styles/wrapper.scss";
import * as Icons from "pages/maintenancecard/commons/Icons";
import { fetchMainCard } from "../../../../../../actions/mainCard";

function Wrapper(props) {
  const { mainCards, fetchMainCard, filterInfo, isEmpty, fetching } = props;
  const [selectedIds, setSelectedIds] = useState([]);
  const { mainCardList } = mainCards
  const listRef = React.useRef();

  useEffect(() => {
    listRef && listRef.current && listRef.current.getData();
  }, []);

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
          Đã chọn ({selectedIds.length} phiếu sửa chữa)
        </span>
      </div>
    );
  };

  const child = renderCheckInfo();
  if (isEmpty) {
    return (
      <div className="delivery-collations-list-wrapper">
        <div id="delivery-collations-filter-empty-wrapper">
          <div id="delivery-collations-filter-empty-text">
            Không có phiếu sửa chữa
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
          checked={selectedIds.length && selectedIds.length === mainCardList.length}
          minus={selectedIds.length && selectedIds.length < mainCardList.length}
          child={child} />
        <List
          ref={listRef}
          mainCardList={mainCardList}
          fetching={fetching}
          isEmpty={isEmpty}
          filterInfo={filterInfo}
          onCheckBoxClick={onCheckBoxClick}
          selectedIds={selectedIds}
          fetchMainCard={fetchMainCard}
          onCheckBoxListClick={onCheckBoxListClick}
        />
        <Footer
          mainCardList={mainCardList}
          resetSelected={resetSelected}
          isEmpty={isEmpty}
          fetchMainCard={fetchMainCard}
          fetching={fetching}
          mainCards={mainCards}
        />
      </div>
    </React.Fragment>
  );
}
Wrapper.defaultProps = {
  selectedIds: [],
  mainCards: [],
};

const mapStateToProps = (state) => {
  const { mainCard : { mainCards , ui: { isEmpty, fetching } , filterInfo } } = state;
  return {
    mainCards,
    filterInfo,
    isEmpty,
    fetching,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchMainCard: (filterInfo, page) => dispatch(fetchMainCard(filterInfo, page)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper));
