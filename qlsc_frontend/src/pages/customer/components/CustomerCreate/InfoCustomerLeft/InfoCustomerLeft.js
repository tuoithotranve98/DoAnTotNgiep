import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getWard, receiveWard } from "../../../actions/locationActions";
import SelectDistricts from "../SelectAddress/SelectDistricts";
import SelectWards from "../SelectAddress/SelectWards";
import "./styles.scss";
function InfoCustomerLeft(props) {
  const {
    customer,
    onChangeCustomer,
    onGetWard,
    wards,
    cities,
    actionSave,
    onChangeStatusValid,
  } = props;
  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);
  const [isInvalidAddress, setIsInvalidAddress] = useState(false);

  useEffect(() => {
    if (actionSave) {
      if (!customer.name) setIsInvalidName(true);
      if (!customer.phone) setIsInvalidPhone(true);
      if (!customer.address) setIsInvalidAddress(true);
    }
  }, [actionSave]);

  useEffect(() => {
    if (customer.name) setIsInvalidName(false);
  }, [customer.name]);

  useEffect(() => {
    if (customer.phone) setIsInvalidPhone(false);
  }, [customer.phone]);

  useEffect(() => {
    if (customer.address) setIsInvalidAddress(false);
  }, [customer.address]);

  const onBlurName = () => {
    if (!customer.name) {
      onChangeStatusValid(true);
      setIsInvalidName(true);
    } else {
      onChangeStatusValid(false);
    }
  };
  const onBlurPhone = () => {
    if (!customer.phone) {
      onChangeStatusValid(true);
      setIsInvalidPhone(true);
    } else {
      onChangeStatusValid(false);
    }
  };
  const onBlurAddress = () => {
    if (!customer.address) {
      onChangeStatusValid(true);
      setIsInvalidAddress(true);
    } else {
      onChangeStatusValid(false);
    }
  };

  const onChangeSelectDistrict = (id) => {
    if (id && customer && customer.city && customer.city.id === id) {
      return;
    } else if (id) {
      const district = Object.values(cities).find(
        (item) => item.id === parseInt(id)
      );
      if (district) {
        onGetWard(district.code);
        onChangeCustomer("city", district);
      }
    }
  };

  const onChangeSelectWard = (id) => {
    if (id) {
      const ward = Object.values(wards).find(
        (item) => item.id === parseInt(id)
      );
      if (ward) onChangeCustomer("ward", ward);
    }
  };

  return (
    <div className="info-customer-left">
      <div className="card info-customer-left-01">
        <div className="title">Thông tin khách hàng</div>
        <div className="content">
          <div className="row">
            <div className="col-md-6">
              <div className="field form-group">
                <span style={{ color: "red", marginRight: "4px" }}>*</span>
                <label className="control-label">Tên khách hàng</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="name"
                    style={isInvalidName ? { border: "1px solid red" } : {}}
                    onBlur={() => onBlurName()}
                    value={customer.name || ""}
                    onChange={(e) => onChangeCustomer("name", e.target.value)}
                    placeholder="Nhập tên khách hàng"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="field form-group">
                <span style={{ color: "red", marginRight: "4px" }}></span>
                <label className="control-label">Mã khách hàng</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="code"
                    readOnly
                    value={customer.code || ""}
                    onChange={(e) => onChangeCustomer("code", e.target.value)}
                    placeholder="Mã khách hàng"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="field form-group">
                <span style={{ color: "red", marginRight: "4px" }}>*</span>
                <label className="control-label">Số điện thoại</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="phone"
                    style={isInvalidPhone ? { border: "1px solid red" } : {}}
                    onBlur={() => onBlurPhone()}
                    value={customer.phone || ""}
                    onChange={(e) => onChangeCustomer("phone", e.target.value)}
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="field form-group">
                <span style={{ color: "red", marginRight: "4px" }}></span>
                <label className="control-label">Email</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="email"
                    value={customer.email || ""}
                    onChange={(e) => onChangeCustomer("email", e.target.value)}
                    placeholder="Nhập email"
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
                    name="address"
                    style={isInvalidAddress ? { border: "1px solid red" } : {}}
                    onBlur={() => onBlurAddress()}
                    value={customer.address || ""}
                    onChange={(e) =>
                      onChangeCustomer("address", e.target.value)
                    }
                    placeholder="Nhập địa chỉ"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="field form-group">
                <span style={{ color: "red", marginRight: "4px" }}>*</span>
                <label className="control-label">Khu vực</label>
                <div className="controls">
                  <SelectDistricts
                    city={customer.city}
                    onSelect={(e) => onChangeSelectDistrict(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div className="field form-group">
                <span style={{ color: "red", marginRight: "4px" }}>*</span>
                <label className="control-label">Phường xã</label>
                <div className="controls">
                  <SelectWards
                    city={customer.city}
                    ward={customer.ward}
                    onSelect={(e) => onChangeSelectWard(e.target.value)}
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

const mapStateToProps = (state) => {
  const {
    locations: { city, ward },
  } = state;
  return {
    cities: city,
    wards: ward,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetWard: (id) => dispatch(getWard(id)),
  onClearWards: () => dispatch(receiveWard([])),
  onSaveCustomer: (customer) => dispatch(saveCustomer(customer)),
});
export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(InfoCustomerLeft)
);
