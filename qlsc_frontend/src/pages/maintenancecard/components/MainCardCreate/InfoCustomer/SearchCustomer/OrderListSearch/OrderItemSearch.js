import React from "react";
import { connect } from "react-redux";
import * as Icons from "pages/maintenancecard/commons/Icons";

function OrderItemSearch(props) {
  const { item, onClick } = props;
  const { name, phone } = item;
  return (
    <div
      className="d-flex align-items-center order-item"
      onMouseDown={() => {
        onClick(item);
        props.setShowFilterCustomer(true);
      }}
    >
      <div className="image-info">
        <Icons.IconCustomer />
      </div>
      <div className="order-code text-ellipsis" style={{ marginLeft: 10 }}>
        <p className="name-cusomter" style={{ marginBottom: 6 }}>
          {name}
        </p>
        <p className="phone-customer">{phone}</p>
      </div>
    </div>
  );
}

export default connect(null, null)(OrderItemSearch);
