/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./styles.scss";
function CustomerDetailInfo(props) {
  const {} = props;
  useEffect(() => {}, []);
  return (
    <div className="customer-detail-info">
      <div className="card">
        <div className="label">Thông tin khách hàng</div>
        <div className="content">
          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã khách hàng</div>
                <div className="content-value">KH001</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã khách hàng</div>
                <div className="content-value">KH001</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã khách hàng</div>
                <div className="content-value">KH001</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã khách hàng</div>
                <div className="content-value">KH001</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã khách hàng</div>
                <div className="content-value">KH001</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã khách hàng</div>
                <div className="content-value">KH001</div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã khách hàng</div>
                <div className="content-value">KH001</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã khách hàng</div>
                <div className="content-value">KH001</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã khách hàng</div>
                <div className="content-value">KH001</div>
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
