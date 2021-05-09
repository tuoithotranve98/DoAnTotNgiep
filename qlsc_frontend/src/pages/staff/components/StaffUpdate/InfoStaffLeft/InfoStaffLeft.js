import React from "react";
import { connect } from "react-redux";
import "./styles.scss";
function InfoStaffLeft(props) {
  const { staff, onChangeStaff } = props;
  return (
    <div className="info-staff-left">
      <div className="card info-staff-left-01">
        <div className="title">Thông tin nhân viên</div>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="field form-group">
                <span style={{ color: "red", marginRight: "4px" }}>*</span>
                <label className="control-label">Tên nhân viên</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="name"
                    value={staff.name || ""}
                    onChange={(e) => onChangeStaff("name", e.target.value)}
                    placeholder="Nhập tên nhân viên"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="field form-group">
                <label className="control-label">Mã nhân viên</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="code"
                    value={staff.code || ""}
                    onChange={(e) => onChangeStaff("code", e.target.value)}
                    placeholder="Nhập mã nhân viên"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="field form-group">
                <span style={{ color: "red", marginRight: "4px" }}>*</span>
                <label className="control-label">Số điện thoại</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="phone"
                    value={staff.phone || ""}
                    onChange={(e) => onChangeStaff("phone", e.target.value)}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="field form-group">
                <span style={{ color: "red", marginRight: "4px" }}>*</span>
                <label className="control-label">Địa chỉ</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="address"
                    value={staff.address || ""}
                    onChange={(e) => onChangeStaff("address", e.target.value)}
                    placeholder="Nhập địa chỉ"
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
InfoStaffLeft.defaultProps = {};

export default React.memo(connect(null, null)(InfoStaffLeft));
