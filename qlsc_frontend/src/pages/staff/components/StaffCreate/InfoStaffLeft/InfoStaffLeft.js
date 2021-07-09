import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./styles.scss";
function InfoStaffLeft(props) {
  const { staff, onChangeStaff, onChangeStatusValidate, actionSave } = props;
  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);
  const [isInvalidAddress, setIsInvalidAddress] = useState(false);

  useEffect(() => {
    if (actionSave) {
      if (!staff.name) setIsInvalidName(true);
      if (!staff.phone) setIsInvalidPhone(true);
      if (!staff.address) setIsInvalidAddress(true);
    }
  }, [actionSave]);

  useEffect(() => {
    if (staff.name) setIsInvalidName(false);
  }, [staff.name]);

  useEffect(() => {
    if (staff.phone) setIsInvalidPhone(false);
  }, [staff.phone]);

  useEffect(() => {
    if (staff.address) setIsInvalidAddress(false);
  }, [staff.address]);

  const onBlurName = () => {
    if (!staff.name) {
      onChangeStatusValidate(true);
      setIsInvalidName(true);
    } else {
      onChangeStatusValidate(false);
    }
  };
  const onBlurPhone = () => {
    if (!staff.phone) {
      onChangeStatusValidate(true);
      setIsInvalidPhone(true);
    } else {
      onChangeStatusValidate(false);
    }
  };
  const onBlurAddress = () => {
    if (!staff.address) {
      onChangeStatusValidate(true);
      setIsInvalidAddress(true);
    } else {
      onChangeStatusValidate(false);
    }
  };
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
                    style={
                      isInvalidName ? { border: "1px solid red" } : {}
                    }
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="name"
                    onBlur={() => onBlurName()}
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
                    readOnly
                    value={staff.code || ""}
                    onChange={(e) => onChangeStaff("code", e.target.value)}
                    placeholder="Mã nhân viên"
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
                    style={
                      isInvalidPhone ? { border: "1px solid red" } : {}
                    }
                    onBlur={() => onBlurPhone()}
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
                    style={
                      isInvalidAddress ? { border: "1px solid red" } : {}
                    }
                    onBlur={() => onBlurAddress()}
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
