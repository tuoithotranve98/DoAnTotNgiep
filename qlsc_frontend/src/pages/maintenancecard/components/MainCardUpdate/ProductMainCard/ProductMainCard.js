import React from "react";
import ProductMainCardList from "./ProductMainCardList/ProductMainCardList";

import "./styles.scss";

function ProductMainCard(props) {
  return (
    <div className="main-card-product-info">
      <div className="title">Thông tin dịch vụ</div>
      <ProductMainCardList
        user={props.user}
        finish={props.finish}
        addProduct={(a) => props.addProduct(a)}
        maintenanceCardDetails={props.maintenanceCardDetails}
        removeProduct={(a) => props.removeProduct(a)}
        setShowModalProduct={(a) => props.setShowModalProduct(a)}
        totalPriceMainCard={(a) => props.totalPriceMainCard(a)}
        onUpdateStatusMaintenanceCardDetail={(a) =>
          props.onUpdateStatusMaintenanceCardDetail(a)
        }
        saveMaintenanceCard={() => props.saveMaintenanceCard()}
      />
    </div>
  );
}

export default ProductMainCard;
