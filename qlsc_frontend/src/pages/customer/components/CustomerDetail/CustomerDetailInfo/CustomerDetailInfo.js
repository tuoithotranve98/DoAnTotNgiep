/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { convertSecondToDate } from 'utils/datetimeUtil';
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
  const dateTime = customer && customer.createdDate ? convertSecondToDate(customer.createdDate) : '---';
  return (
    <div className="customer-detail-info">
      <div className="card">
        <div className="title">Thông tin khách hàng</div>
        <div className="content">
          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã khách hàng: &nbsp; </div>
                <div className="content-value">{(customer && customer.code) || '---'}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Ngày tạo: &nbsp; </div>
                <div className="content-value">{dateTime}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Email: &nbsp; </div>
                <div className="content-value">{(customer && customer.email) || '---'}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Tên khách hàng: &nbsp; </div>
                <div className="content-value">{(customer && customer.email) || '---'}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Ngày sửa:  &nbsp; </div>
                <div className="content-value">{(customer && customer.address) || '---'}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Địa chỉ: &nbsp; </div>
                <div className="content-value">{formatAddress() || '---'}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Số điện thoại: &nbsp; </div>
                <div className="content-value">{(customer && customer.phone) || '---'}</div>
              </div>
            </div>
            <div className="col-4">

            </div>
            <div className="col-4">
              <div className="d-flex item">
              <div className="label">Mô tả: &nbsp; </div>
                <div className="content-value">{(customer && customer.description) || '---'}</div>
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
