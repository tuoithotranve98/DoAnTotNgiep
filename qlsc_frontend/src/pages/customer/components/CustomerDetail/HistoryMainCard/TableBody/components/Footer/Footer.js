import React from 'react';
import Pagination from 'components/Pagination/Pagination';
import { connect } from 'react-redux';
import '../../styles/footer.scss';

function Footer(props) {
  const calculateBegin = () => {
    const { page, size } = props;
    const pageTmp = page - 1;
    if (pageTmp === 0) {
      return 1;
    } return size * pageTmp + 1;
  };

  const calculateEnd = () => {
    const { page, size, total } = props;
    const pageTmp = page - 1;
    const per = total / size;
    if (per <= 1) {
      return total;
    }
    if (pageTmp < Math.floor(per)) {
      return (pageTmp + 1) * size;
    } return total;
  };

  const onChangePage = (id) => {
    const { onClick, resetSelected } = props;
    onClick(id);
    resetSelected();
  };

  const {
    total, page, size, fetching, isEmpty
  } = props;
  if (fetching || isEmpty) return null;
  return (
    <div className="d-flex delivery-collations-footer">
      <div className="result-info">
        Hiển thị kết quả từ&nbsp;
        {calculateBegin()} -&nbsp;
        {calculateEnd()} trên tổng {total}
      </div>
      <div className="margin-left-auto" />
      <div className="products-pagination">
        <Pagination
          total={total}
          page={page}
          size={size}
          onClick={onChangePage}
        />
      </div>
    </div>
  );
}

Footer.defaultProps = {
  size: 20,
};

const mapStateToProps = (state) => {
  const { mainCards: { mainCard: { total, page }, ui: { fetching } } } = state;
  return {
    total,
    page,
    fetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClick: (page) => dispatch(fetchMainCard(null, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
