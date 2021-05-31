import React from "react";
import { connect } from "react-redux";
import * as Icons from "../../../../../../commons/Icons";
import { moneyFormat } from "utils/moneyFormat";

function OrderItemSearch(props) {
  const { item, onClick } = props;
  return (
    <div
      className="d-flex align-items-center product-item-info"
      onMouseDown={() => {
        onClick(item);
      }}
    >
      <div className="content-info-image">
        <Icons.IconService />
      </div>
      <div className="content-info" style={{ marginLeft: 10 }}>
        <div className="search-name text-ellipsis">{item.name}</div>
        <div className="search-type">
          {item.type === 1 ? "Linh kiện" : "Dịch vụ"}
        </div>
      </div>
      <div className="content-info-price">
        <div className="search-price text-ellipsis">
          {moneyFormat(item.pricePerUnit)}
        </div>
        <div className="search-quantity">
          <b>Có thể bán:&nbsp;</b>
          {moneyFormat(item.quantity)}
        </div>
      </div>
    </div>
  );
}

export default connect(null, null)(OrderItemSearch);
