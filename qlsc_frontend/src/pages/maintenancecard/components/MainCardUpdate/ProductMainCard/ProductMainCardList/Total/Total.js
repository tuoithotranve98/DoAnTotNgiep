/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { moneyFormat } from 'utils/moneyFormat';

function Total(props) {
  const { totalPriceMainCard, maintenanceCardDetails } = props;
  // if (listOrderCollation.length === 0) return '';
  return (
    <div className="d-flex align-items-center justify-content-end product-info-total">
      <div style={{ width: 200 }}>
        <div className="d-flex align-items-center justify-content-between total-item font-weight-bold">
          <div>
            Tổng tiền:
          </div>
          <div>
            {moneyFormat(totalPriceMainCard(maintenanceCardDetails))} đ
          </div>
        </div>
      </div>
    </div>
  );
}

export default Total;
