/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-const-assign */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import List from '../List/List';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import '../../styles/wrapper.scss';
import * as Icons from 'pages/maintenancecard/commons/Icons';

function Wrapper(props) {
  // const [selectedIds, setSelectedIds] = useState([]);
  const {
    selectedIds, selectedMainCardIds, fetching, isEmpty
  } = props;
  const listRef = React.useRef();

//   useEffect(() => {
//     const filterInfo = getFilterFromURL();
//     listRef && listRef.current && listRef.current.getData(filterInfo);
//   }, []);

//   useEffect(() => {
//     if (!fetching) {
//         selectedMainCardIds([]);
//     }
//   }, [fetching]);

  const getFilterFromURL = () => {
    const { history } = props;
    const { search } = history.location;
    if (!search || !search.includes('filter')) return undefined;
    try {
      const filter = search.split('?filter=')[1].split('&hmac')[0].split('%')[0];
      return JSON.parse(atob(filter));
    } catch (e) {
      console.log(e);
    }
  };

  const onCheckBoxClick = (id) => {
    selectedMainCardIds(
      selectedIds.includes(id) ? selectedIds.filter(it => it !== id) : selectedIds.concat(id)
    );
  };

  const resetSelected = () => {
    selectedMainCardIds([]);
  };

  const onClick = () => {
    listRef && listRef.current.onCheckAll();
  };

  const onCheckBoxListClick = (ids) => {
    selectedMainCardIds(ids);
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
  const ordersSize = props.itemIds && props.itemIds.length;
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
          checked={selectedIds.length && selectedIds.length === ordersSize}
          minus={selectedIds.length && selectedIds.length < ordersSize}
          child={child}
        />
        <List
          ref={listRef}
          itemIds={props.itemIds}
          fetchMainCard={() => props.fetchMainCard()}
          onCheckBoxClick={onCheckBoxClick}
          selectedIds={selectedIds}
          onCheckBoxListClick={onCheckBoxListClick}
          isEmpty={isEmpty}
          fetching={fetching}
        />
        <Footer
          resetSelected={resetSelected}
          isEmpty={isEmpty}
        />
      </div>
    </React.Fragment>
  );
}
Wrapper.defaultProps = {
  selectedIds: [],
  selectedMainCardIds: () => {}
};
const mapStateToProps = (state) => {
  const { products: { ui: { fetching, isEmpty }, product: { selectedIds } } } = state;
  return {
    fetching,
    isEmpty,
    selectedIds,
  };
};
const mapDispatchToProps = (dispatch) => ({
    fetchMainCard: (filter, page) => dispatch(fetchMainCard(filter, page)),
  selectedMainCardIds: (ids) => dispatch(selectedMainCardIds(ids)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper));
