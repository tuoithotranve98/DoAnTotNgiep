import React from 'react';
import ProductMainCardList from './ProductMainCardList/ProductMainCardList';

import './styles.scss';

function ProductMainCard(props) {
  return (
    <div className="main-card-product-info">
      <div className="title">
        Thông tin sản phẩm
      </div>
      <ProductMainCardList
        addProduct={(a)=>props.addProduct(a)} products={props.products}
        removeProduct={(a)=>props.removeProduct(a)}
        setShowModalProduct={(a)=>props.setShowModalProduct(a)}
        totalPriceMainCard={(a)=> props.totalPriceMainCard(a)}
        saveMaintenanceCard={()=> props.saveMaintenanceCard()}
      />
    </div>
  );
}

export default ProductMainCard;
