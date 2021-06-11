import React from "react";
import Pagination from "../Pagination/Pagination";
import { connect } from "react-redux";
import "../../styles/footer.scss";

function Footer(props) {
  const { customer, onChangeFilter, isEmpty , fetching, size} = props;
  const { currentPage, totalItems, totalPages, customers } = customer;

  const calculateBegin = () => {
    if (currentPage === 1) {
      return 1;
    }
    if (currentPage === totalPages) {
      return (size * (currentPage - 1) + 1);
    }
    return (size * (currentPage - 1)) + 1;
  };

  const calculateEnd = () => {
    if (totalPages === 1) {
      return totalItems;
    }
    if (currentPage === 1) {
      return (currentPage * size);
    }
    if (totalPages > currentPage) {
      return ((currentPage) * size);
    }
    if (currentPage === totalPages) {
      return totalItems;
    }
    return ((currentPage - 1) * size) + (totalItems%currentPage);
  };
  const selectSize = (size) => {
    onChangeFilter("size", size);
  }
  if (fetching || isEmpty) return null;
  return (
    <div className="d-flex customer-footer">
      <div className="result-info">
        Hiển thị kết quả từ&nbsp;
        {calculateBegin()} -&nbsp;
        {calculateEnd()} trên tổng {totalItems}
      </div>
      {/* <div className="pagination-size-custom">
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
      </div> */}
      <div className="margin-left-auto" />
      <div className="products-pagination">
        <Pagination
          totalPage={totalPages}
          page={currentPage}
          totalItem={totalItems}
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
