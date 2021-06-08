import React from "react";
import { connect } from "react-redux";
import "../../styles/footer.scss";
import Pagination from "../Pagination/Pagination";

function Footer(props) {
  const { mainCards, fetchMainCard, isEmpty , fetching} = props;
  const { currentPage, totalItems, totalPages } = mainCards;
  const onChangePage = (id) => {
    fetchMainCard(null, id);
  };
  const calculateBegin = () => {
    const pageTmp = currentPage - 1;
    if (pageTmp === 0) {
      return 1;
    } return totalItems * pageTmp + 1;
  };

  const calculateEnd = () => {
    const pageTmp = currentPage - 1;
    const per = totalPages / totalItems;
    if (per <= 1) {
      return totalPages;
    }
    if (pageTmp < Math.floor(per)) {
      return (pageTmp + 1) * totalItems;
    } return totalPages;
  };
  if (fetching || isEmpty) return null;
  return (
    <div className="d-flex delivery-collations-footer">
      <div className="result-info">
        Hiển thị kết quả từ&nbsp;
        {calculateBegin()} -&nbsp;
        {calculateEnd()} trên tổng {totalPages}
      </div>
      <div className="margin-left-auto" />
      <div className="products-pagination">
      <Pagination
          total={totalPages}
          page={currentPage}
          size={totalItems}
          onClick={onChangePage}
        />
      </div>
    </div>
  );
}

Footer.defaultProps = {
  size: 10,
};

export default connect(null, null)(Footer);
