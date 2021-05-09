/* eslint-disable no-shadow */
import React from "react";
import { connect } from "react-redux";
import "./styles.scss";
function InfoCustomerRight(props) {
  const { customer, onChangeCustomer } = props;
  return (
    <div className="info-customer-right">
      <div className="card info-customer-right-01">
        <div className="title">Thông tin khác</div>
        <div className="content">
          <div className="field form-group">
            <label className="control-label">Ghi chú</label>
            <div className="controls">
              <textarea
                name="description"
                placeholder="Ghi chú"
                value={customer.description || ''}
                onChange={(e) => onChangeCustomer("description", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
InfoCustomerRight.defaultProps = {};

export default React.memo(connect(null, null)(InfoCustomerRight));
