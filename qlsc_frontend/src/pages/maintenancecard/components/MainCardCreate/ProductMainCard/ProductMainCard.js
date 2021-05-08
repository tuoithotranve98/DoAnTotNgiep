import React from 'react';
import ProductMainCardList from './ProductMainCardList/ProductMainCardList';

import './styles.scss';

function ProductMainCard(props) {
  return (
    <div className="delivery-collation-order-info">
      <div className="title">
        Thông tin đơn hàng đối soát
      </div>
      {/* <ProductMainCardList /> */}
    </div>
  );
}

export default ProductMainCard;
