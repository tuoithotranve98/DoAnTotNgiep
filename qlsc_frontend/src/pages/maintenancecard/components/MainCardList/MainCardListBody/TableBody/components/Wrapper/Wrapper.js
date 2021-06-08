import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import List from "../List/List";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../styles/wrapper.scss";
import { fetchMainCard } from "../../../../../../actions/mainCard";
import imgNoMainCard from "images/NoMainCard.png";

function Wrapper(props) {
  const { mainCards, fetchMainCard, filterInfo, isEmpty, fetching } = props;
  const [selectedIds, setSelectedIds] = useState([]);
  const { mainCardList } = mainCards;
  const listRef = React.useRef();

  useEffect(() => {
    listRef && listRef.current && listRef.current.getData();
  }, []);

  useEffect(() => {
    if (fetching) setSelectedIds([]);
  }, [fetching]);

  const onClick = () => {
    listRef && listRef.current.onCheckAll();
  };

  const onCheckBoxClick = (id) => {
    setSelectedIds(
      selectedIds.includes(id)
        ? selectedIds.filter((it) => it !== id)
        : selectedIds.concat(id)
    );
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

  console.log('check filterInfo', filterInfo);
  const child = renderCheckInfo();
  if (isEmpty) {
    return (
      <div className="delivery-collations-list-wrapper">
        <div id="delivery-collations-filter-empty-wrapper">
          <div id="delivery-collations-filter-empty-text">
            Không có phiếu sửa chữa
          </div>
          <div
            id="delivery-collations-filter-empty-icon"
            style={{ height: "100%" }}
          >
            <img style={{ height: "100%" }} src={imgNoMainCard} alt=""></img>
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
          checked={
            selectedIds.length && selectedIds.length === mainCardList.length
          }
          minus={selectedIds.length && selectedIds.length < mainCardList.length}
          selectedIds={selectedIds}
          child={child}
        />
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
          size={10}
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
  const {
    mainCard: {
      mainCards,
      ui: { isEmpty, fetching },
      filterInfo,
    },
  } = state;
  return {
    mainCards,
    filterInfo,
    isEmpty,
    fetching,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchMainCard: (filterInfo, page) =>
    dispatch(fetchMainCard(filterInfo, page)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Wrapper)
);
