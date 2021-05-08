/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import { IconIsEmptyOrder } from '../../../../../../product/commons/Icons';
import * as Icons from 'pages/maintenancecard/commons/Icons';
function OrderItemSearch(props) {
  const { item, onClick } = props;
  const {
    name,
    phone
  } = item;
  // const totalAmount = item.service_provider_cod_amount ? moneyFormat(item.service_provider_cod_amount) : 0;
  // const totalShipFee = item.service_provider_ship_fee ? moneyFormat(item.service_provider_ship_fee) : 0;
  return (
    <div className="d-flex align-items-center order-item" onMouseDown={() => onClick(item)}>
        <div className="image-info">
          <Icons.IconCustomer />
        </div>
        <div className="order-code text-ellipsis" style={{ marginLeft: 10}}>
            <p className="name-cusomter">{name}</p>
            <p className="phone-customer">{phone}</p>
        </div>
    </div>
  );
}


export default connect(null, null)(OrderItemSearch);
