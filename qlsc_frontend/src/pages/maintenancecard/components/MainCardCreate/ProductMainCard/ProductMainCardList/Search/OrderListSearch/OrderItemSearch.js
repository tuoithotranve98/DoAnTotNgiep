/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { connect } from "react-redux";
import * as Icons from "pages/maintenancecard/commons/Icons";
function OrderItemSearch(props) {
  const { item, onClick } = props;
  // const { name, phone } = item;
  // const totalAmount = item.service_provider_cod_amount ? moneyFormat(item.service_provider_cod_amount) : 0;
  // const totalShipFee = item.service_provider_ship_fee ? moneyFormat(item.service_provider_ship_fee) : 0;
  return (
    <div
      className="d-flex align-items-center product-item-info"
      onMouseDown={() => {
        onClick(item);
      }}
    >
      <div className="content-info-image">
        <Icons.IconCustomer />
      </div>
      <div className="content-info" style={{ marginLeft: 10 }}>
        <div className="search-name text-ellipsis">{item.name}</div>
        <div className="search-type">{item.type === 1 ? 'Linh kiện' : 'Dịch vụ'}</div>
      </div>
      <div className="content-info-price">
        <div className="search-price text-ellipsis">{item.pricePerUnit}</div>
        <div className="search-quantity"><b>Có thể bán:&nbsp;</b>{item.quantity}</div>
      </div>
    </div>
  );
}

export default connect(null, null)(OrderItemSearch);
