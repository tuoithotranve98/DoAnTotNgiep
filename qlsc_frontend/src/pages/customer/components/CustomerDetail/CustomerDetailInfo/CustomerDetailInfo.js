/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./styles.scss";
function CustomerDetailInfo(props) {
  const { customer } = props;

  const formatAddress = () => {
    const { ward } = customer; 
    let txtAddress = '';
    if (ward) {
      txtAddress += ward.text;
    }
    if (ward && ward.district) {
      txtAddress += ward.district.text;
    }
    return txtAddress;
  }
  return (
    <div className="customer-detail-info">
      <div className="card">
        <div className="label">Thông tin khách hàng</div>
        <div className="content">
          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã khách hàng: </div>
                <div className="content-value">{(customer && customer.code) || ''}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Tên khách hàng: </div>
                <div className="content-value">{(customer && customer.name) || ''}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Số điện thoại: </div>
                <div className="content-value">{(customer && customer.phone) || ''}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Email: </div>
                <div className="content-value">{(customer && customer.email) || ''}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Địa chỉ: </div>
                <div className="content-value">{(customer && customer.address) || ''}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Địa chỉ: </div>
                <div className="content-value">{formatAddress()}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Ghi chú: </div>
                <div className="content-value">{(customer && customer.description) || ''}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
              <div className="label">Ghi chú: </div>
                <div className="content-value">---</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
              <div className="label">Ghi chú: </div>
                <div className="content-value">---</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
CustomerDetailInfo.defaultProps = {};

export default React.memo(connect(null, null)(CustomerDetailInfo));
