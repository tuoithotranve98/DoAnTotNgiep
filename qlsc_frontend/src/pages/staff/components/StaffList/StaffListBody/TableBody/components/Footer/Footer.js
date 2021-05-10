import React, { useState } from "react";
import Pagination from "components/Pagination/Pagination";
import { connect } from "react-redux";
import "../../styles/footer.scss";

function Footer(props) {
  const { staff, onChangeFilter } = props;
  const { currentPage, totalItem, totalPage, staffs } = staff;
  const [size, setSize] = useState(10);
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
      return totalItem + 1;
    }
    if (currentPage === 1) {
      return currentPage * size;
    }
    if (totalPage > currentPage) {
      return (currentPage + 1) * size;
    }
    if (currentPage === totalPage) {
      return totalItem + 1;
    }
    return currentPage * size + (totalItem % currentPage);
  };

  const onChangePage = (id) => {
    const { onClick, resetSelected } = props;
    onClick(id);
    resetSelected();
  };

  return (
    <div className="d-flex staff-footer">
      <div className="result-info">
        Hiển thị kết quả từ&nbsp;
        {calculateBegin()} -&nbsp;
        {calculateEnd()} trên tổng {totalItem + 1}
      </div>
      <div className="margin-left-auto" />
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
