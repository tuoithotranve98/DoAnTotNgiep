/* eslint-disable no-shadow */
import React from "react";
import { connect } from "react-redux";
import "./styles.scss";
import * as Icons from 'pages/maintenancecard/commons/Icons';

function PaymentMethod(props) {
  const {mainCardTotal} = props;
  return (
    <div className="main-card-payment-method">
      <div className="card-method info-customer-right-01">
        <div className="d-flex list-header title">
          <div className="header-title">
            <div style={{ fontSize: "20px" }}>Thanh toán</div>
            <div className="text">Đã thanh toán: 0đ</div>
          </div>
          <div className="header-action">
            <button
              className="d-flex align-items-center justify-content-between btn btn-create"
              type="button"
              onClick={()=>props.setShowModalPayment(true)}
            >
              <span
                className="d-flex align-items-center justify-content-center"
                style={{ marginLeft: 10 }}
              >
                <Icons.Create />
              </span>
              Thanh toán
            </button>
            <div className="text">Còn phải trả: {mainCardTotal}đ</div>
          </div>
        </div>
        <div className="content">
        </div>
      </div>
    </div>
  );
}
PaymentMethod.defaultProps = {};

export default React.memo(connect(null, null)(PaymentMethod));
