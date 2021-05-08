import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./styles.scss";
function Service(props) {
  const {} = props;
  useEffect(() => {}, []);
  return (
    <div className="col-md-12">
      <div className="info-product-left">
        <div className="card info-product-left-01">
          <div className="title">Thông tin Dịch vụ</div>
          <div className="content">
            <div className="row">
              <div className="col-md-4">
                <div className="field form-group">
                  <span style={{ color: "red", marginRight: "4px" }}>*</span>
                  <label className="control-label">Tên dịch vụ</label>
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
              <div className="col-md-4">
                <div className="field form-group">
                  <span style={{ color: "red", marginRight: "4px" }}>*</span>
                  <label className="control-label">Giá dịch vụ</label>
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
              <div className="col-md-4">
                <div className="field form-group">
                  <span style={{ color: "red", marginRight: "4px" }}>*</span>
                  <label className="control-label">Mã dịch vụ</label>
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
              <div className="col-md-12">
                <div className="field form-group">
                  <label className="control-label">Mô tả</label>
                  <div className="controls">
                    <textarea name="description" placeholder="Mô tả" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Service.defaultProps = {};

export default React.memo(connect(null, null)(Service));
