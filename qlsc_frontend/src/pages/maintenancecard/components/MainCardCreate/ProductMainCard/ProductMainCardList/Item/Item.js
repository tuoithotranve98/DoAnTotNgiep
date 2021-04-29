/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { moneyFormat } from 'util/moneyFormat';

function Item(props) {

  return (
    <div className="d-flex align-items-center delivery-collation-order-row">
      <div className="order text-ellipsis">
        <span className="item-name">
          <a
            data-tip
            data-for={`order_collation_number_id_${id}`}
            href={calcHref(connection.channel_type)}
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            {channel_order_number}
            <ReactTooltip
              place="top"
              type="dark"
              effect="solid"
              isMultiline
              id={`order_collation_number_id_${id}`}
            >
              {channel_order_number}
            </ReactTooltip>

          </a>
        </span>
      </div>
      <div className="text-ellipsis track-code" style={{ color: '#0088FF' }}>
        { sapo_tracking_code ? (
          <span className="item-name">
            <a
              data-tip
              data-for={`delivery_collation_fultillment_code_${id}`}
              href={calcHrefFulfillment()}
              target="_blank"
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              {sapo_tracking_code}
              <ReactTooltip
                place="top"
                type="dark"
                effect="solid"
                isMultiline
                id={`delivery_collation_fultillment_code_${id}`}
              >
                {sapo_tracking_code}
              </ReactTooltip>

            </a>
          </span>
        ) : '---'}
      </div>
      <div className="tenant text-ellipsis">
        <Tooltip
          id={`order_collation_tenant_id_${id}`}
          text={connection.short_name}
          comp={tenantComp}
          onClick={e => e.stopPropagation()}
        />
      </div>
      <div className="d-flex align-items-center justify-content-end sapo-revenue">
        { systemCodAmount }
      </div>
      <div className="d-flex align-items-center justify-content-end item-service_provider_cod_amount">
        <NumberFormat
          name="service_provider_cod_amount"
          allowNegative={false}
          thousandSeparator=","
          decimalScale={3}
          value={item.service_provider_cod_amount || 0}
          onValueChange={(e) => onChangeItem(id, 'service_provider_cod_amount', e.value)}
          onClick={(e) => handleClick('total-amount', e)}
          getInputRef={inputToltalAmount}
        />
      </div>
      <div className="d-flex align-items-center justify-content-end sapo-record">
        {systemShipFee}
      </div>
      <div className="d-flex align-items-center justify-content-end real-record item-service_provider_ship_fee">
        <NumberFormat
          name="service_provider_ship_fee"
          className="service_provider_ship_fee"
          allowNegative={false}
          thousandSeparator=","
          decimalScale={3}
          value={item.service_provider_ship_fee || 0}
          onValueChange={(e) => onChangeItem(id, 'service_provider_ship_fee', e.value)}
          onClick={() => handleClick('ship-fee')}
          getInputRef={inputShipFee}
        />
      </div>
      <div className="remove" onClick={() => props.removeOrderItem(id)}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.251763 0.251763C0.331366 0.171957 0.425932 0.10864 0.530044 0.0654386C0.634156 0.0222369 0.745768 0 0.858488 0C0.971207 0 1.08282 0.0222369 1.18693 0.0654386C1.29104 0.10864 1.38561 0.171957 1.46521 0.251763L6.00022 4.78849L10.5352 0.251763C10.6149 0.172086 10.7095 0.108884 10.8136 0.065763C10.9177 0.0226426 11.0293 0.000448674 11.142 0.000448674C11.2546 0.000448674 11.3662 0.0226426 11.4703 0.065763C11.5744 0.108884 11.669 0.172086 11.7487 0.251763C11.8284 0.331439 11.8916 0.426028 11.9347 0.53013C11.9778 0.634232 12 0.745808 12 0.858488C12 0.971167 11.9778 1.08274 11.9347 1.18685C11.8916 1.29095 11.8284 1.38554 11.7487 1.46521L7.21196 6.00022L11.7487 10.5352C11.8284 10.6149 11.8916 10.7095 11.9347 10.8136C11.9778 10.9177 12 11.0293 12 11.142C12 11.2546 11.9778 11.3662 11.9347 11.4703C11.8916 11.5744 11.8284 11.669 11.7487 11.7487C11.669 11.8284 11.5744 11.8916 11.4703 11.9347C11.3662 11.9778 11.2546 12 11.142 12C11.0293 12 10.9177 11.9778 10.8136 11.9347C10.7095 11.8916 10.6149 11.8284 10.5352 11.7487L6.00022 7.21196L1.46521 11.7487C1.38554 11.8284 1.29095 11.8916 1.18685 11.9347C1.08274 11.9778 0.971167 12 0.858488 12C0.745808 12 0.634232 11.9778 0.53013 11.9347C0.426028 11.8916 0.331439 11.8284 0.251763 11.7487C0.172086 11.669 0.108884 11.5744 0.065763 11.4703C0.0226426 11.3662 0.000448674 11.2546 0.000448674 11.142C0.000448674 11.0293 0.0226426 10.9177 0.065763 10.8136C0.108884 10.7095 0.172086 10.6149 0.251763 10.5352L4.78849 6.00022L0.251763 1.46521C0.171957 1.38561 0.10864 1.29104 0.0654386 1.18693C0.0222369 1.08282 0 0.971207 0 0.858488C0 0.745768 0.0222369 0.634156 0.0654386 0.530044C0.10864 0.425932 0.171957 0.331366 0.251763 0.251763Z" fill="black" />
        </svg>
      </div>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  const { deliveryCollation: { orderCollations: { items } } } = state;
  return {

  };
};
export default connect(mapStateToProps, null)(Item);
