import React, { useState } from "react";
import Pagination from "components/Pagination/Pagination";
import { connect } from "react-redux";
import "../../styles/footer.scss";

function Footer(props) {
  const { customer, onGetCustomer, onChangeFilter, isEmpty , fetching} = props;
  const { currentPage, totalItems, totalPages, customers } = customer;
  const [size, setSize] = useState(10);

  const calculateBegin = () => {
    if (currentPage === 1) {
      return 1;
    }
    if (currentPage === totalPages) {
      return (size * (currentPage - 1) + customers.length);
    }
    return (size * currentPage) + 1;
  };

  const calculateEnd = () => {
    if (totalPages === 1) {
      return totalItems + 1;
    }
    if (currentPage === 1) {
      return (currentPage * size);
    }
    if (totalPages > currentPage) {
      return ((currentPage + 1) * size);
    }
    if (currentPage === totalPages) {
      return totalItems + 1;
    }
    return (currentPage * size) + (totalItems%currentPage);
  };
  if (fetching || isEmpty) return null;
  return (
    <div className="d-flex delivery-collations-footer">
      <div className="result-info">
        Hiển thị kết quả từ&nbsp;
        {calculateBegin()} -&nbsp;
        {calculateEnd()} trên tổng {totalItems + 1}
      </div>
      <div className="margin-left-auto" />
      <div className="products-pagination">
        <Pagination
          totalPage={totalPages}
          page={currentPage}
          totalItem={totalItems}
          size={size}
          onGetCustomer={onGetCustomer}
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
