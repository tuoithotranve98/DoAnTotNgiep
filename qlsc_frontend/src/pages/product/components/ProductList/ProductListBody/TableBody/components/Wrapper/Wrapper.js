import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import List from "../List/List";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "../../styles/wrapper.scss";
import * as Icons from "pages/product/commons/Icons";

function Wrapper(props) {
  const { product, onChangeFilter } = props;
  const { productSerives } = product;

  const [selectedIds, setSelectedIds] = useState([]);
  const listRef = React.useRef();

  useEffect(() => {
    if (product.fetching) setSelectedIds([]);
  }, [product.fetching]);

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
        <span className="details">Đã chọn ({selectedIds.length} sản phẩm)</span>
      </div>
    );
  };

  const child = renderCheckInfo();
  const isEmpty = product.isEmpty;
  const fetching = product.fetching;
  if (isEmpty) {
    return (
      <div className="product-list-wrapper">
        <div id="product-filter-empty-wrapper">
          <div id="product-filter-empty-text">Không có sản phẩm dịch vụ</div>
          <div id="product-filter-empty-icon">
            <Icons.OrderCollationFilterEmpty />
          </div>
        </div>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className="product-list-wrapper">
        <Header
          onClick={onClick}
          checked={
            selectedIds.length &&
            productSerives.length === productSerives.length
          }
          minus={
            selectedIds.length && selectedIds.length < productSerives.length
          }
          child={child}
          selectedIds={selectedIds}
        />
        <List
          product={product}
          ref={listRef}
          fetching={fetching}
          isEmpty={isEmpty}
          onCheckBoxClick={onCheckBoxClick}
          selectedIds={selectedIds}
          onCheckBoxListClick={onCheckBoxListClick}
        />
        <Footer
          onChangeFilter={onChangeFilter}
          product={product}
          resetSelected={resetSelected}
          isEmpty={isEmpty}
          fetching={fetching}
        />
      </div>
    </React.Fragment>
  );
}
Wrapper.defaultProps = {
  selectedIds: [],
  product: {},
};

const mapStateToProps = (state) => {
  const { product } = state;
  return {
    product,
  };
};

export default withRouter(connect(mapStateToProps, null)(Wrapper));
