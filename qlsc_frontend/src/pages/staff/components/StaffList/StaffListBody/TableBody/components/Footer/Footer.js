import React, { useState } from "react";
import Pagination from "components/Pagination/Pagination";
import { connect } from "react-redux";
import * as Icons from "../../../../../../commons/Icons";
import "../../styles/footer.scss";

function Footer(props) {
  const { staff, onChangeFilter, size } = props;
  const { currentPage, totalItem, totalPage, staffs } = staff;
  const calculateBegin = () => {
    if (currentPage === 1) {
      return 1;
    }
    if (currentPage === totalPage) {
      return size * (currentPage - 1) + staffs.length;
    }
    return size * currentPage + 1;
  };

  const calculateEnd = () => {
    if (totalPage === 1) {
      return totalItem;
    }
    if (currentPage === 1) {
      return currentPage * size;
    }
    if (totalPage > currentPage) {
      return (currentPage + 1) * size;
    }
    if (currentPage === totalPage) {
      return totalItem;
    }
    return currentPage * size + (totalItem % currentPage);
  };

  const selectSize = (size) => {
    onChangeFilter("size", size);
  }

  return (
    <div className="d-flex staff-footer">
      <div className="result-info">
        Hiển thị kết quả từ&nbsp;
        {calculateBegin()} -&nbsp;
        {calculateEnd()} trên tổng {totalItem}
      </div>
      <div className="pagination-size-custom">
        <div id="pagination-size">
          <div className="pagination-size-text">Hiển thị</div>
          <div className="pagination-size-option">
            <button
              type="button"
              className="dropdown-toggle pagination-size-button"
              data-toggle="dropdown"
            >
              {size}
              <Icons.Arrow />
            </button>
            <div className="dropdown-menu pagination-size-menu">
              <a
                className="dropdown-item pagination-size-item"
                onClick={() => selectSize(20)}
              >
                20
              </a>
              <a
                className="dropdown-item pagination-size-item"
                onClick={() => selectSize(50)}
              >
                50
              </a>
              <a
                className="dropdown-item pagination-size-item"
                onClick={() => selectSize(100)}
              >
                100
              </a>
            </div>
          </div>
          <div className="pagination-size-text">kết quả</div>
        </div>
      </div>
      <div className="products-pagination">
        <Pagination
          totalPage={totalPage}
          page={currentPage}
          totalItem={totalItem}
          size={size}
          onChangeFilter={onChangeFilter}
        />
      </div>
    </div>
  );
}

Footer.defaultProps = {
  size: 10,
};

export default connect(null, null)(Footer);
