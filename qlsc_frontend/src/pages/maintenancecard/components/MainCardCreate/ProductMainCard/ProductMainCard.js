import React from 'react';
import ProductMainCardList from './ProductMainCardList/ProductMainCardList';

import './styles.scss';

function ProductMainCard(props) {
  return (
    <div className="delivery-collation-order-info">
      <div className="title">
        Thông tin sản phẩm
      </div>
      {/* <ProductMainCardList /> */}
    </div>
  );
}

export default ProductMainCard;
