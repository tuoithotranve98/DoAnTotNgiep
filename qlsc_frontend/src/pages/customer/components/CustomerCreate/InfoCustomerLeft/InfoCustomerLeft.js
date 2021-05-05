/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./styles.scss";
function InfoCustomerLeft(props) {
  const {} = props;
  useEffect(() => {}, []);
  return (
    <div className="info-customer-left">
      <div className="card info-customer-left-01">
        <div className="title">Thông tin khách hàng</div>
        <div className="content">
          <div className="row">
            <div className="col-md-6">
              <div className="field form-group">
                <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                <label className="control-label">Tên sản phẩm</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="name"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
            <div className="field form-group">
                <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                <label className="control-label">Tên sản phẩm</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="name"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
              </div>
            </div>
          </div>
        <div className="row">
            <div className="col-md-6">
              <div className="field form-group">
                <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                <label className="control-label">Tên sản phẩm</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="name"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
            <div className="field form-group">
                <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                <label className="control-label">Tên sản phẩm</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="name"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card info-customer-left-02">
        <div className="title">Thông tin địa chỉ</div>
        <div className="content">
          <div className="row">
            <div className="col-md-6">
              <div className="field form-group">
                <label className="control-label">Địa chỉ</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="name"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
            <div className="field form-group">
                <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                <label className="control-label">Tên sản phẩm</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="name"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
              </div>
            </div>
          </div>
        <div className="row">
            <div className="col-md-6">

            </div>
            <div className="col-md-6">
            <div className="field form-group">
                <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                <label className="control-label">Tên sản phẩm</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="name"
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
InfoCustomerLeft.defaultProps = {};

export default React.memo(connect(null, null)(InfoCustomerLeft));
