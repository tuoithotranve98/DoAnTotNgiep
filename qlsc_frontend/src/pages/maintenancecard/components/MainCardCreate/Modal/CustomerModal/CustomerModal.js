/* eslint-disable import/order */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./styles.scss";
import { connect } from "react-redux";
import SelectDistricts from "./SelectDistricts";
import { getWard } from "../../../../../customer/actions/locationActions";
import SelectWards from "./SelectWards";

function CustomerModal(props) {
    const { customer, showModalCustomer,
      setShowModalCustomer, onChangeCustomer, saveCustomer, cities , wards ,onGetWard,
      setCreateCustomer,
      initialStateCustomer,
    } = props;
    const handleClose = () => {
      setCreateCustomer(initialStateCustomer)
      setShowModalCustomer(false)
    };
  const onChangeSelectDistrict = (id) => {
    if (id) {
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
  }
  const onConfirm = () => {
    saveCustomer();
  };
  return (
    <Modal
      show={showModalCustomer}
      onHide={handleClose}
      size="lg"
      dialogClassName="modal-create-customer"
    >
      <Modal.Header closeButton>
        <div className="modal-title">
          <span>Thêm mới khách hàng</span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="field form-group">
                  <span style={{ color: "red", marginRight: "4px" }}>*</span>
                  <label className="control-label">Tên khách hàng</label>
                  <div className="controls">
                    <input
                      className="input"
                      data-tip=""
                      data-for="_extends_popup_error"
                      name="name"
                      value={customer.name || ''}
                      onChange={(e) => onChangeCustomer("name", e.target.value)}
                      placeholder="Nhập tên khách hàng"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="field form-group">
                  <label className="control-label">Số điện thoại</label>
                  <div className="controls">
                    <input
                      className="input"
                      data-tip=""
                      data-for="_extends_popup_error"
                      name="phone"
                      value={customer.phone || ''}
                      onChange={(e) => onChangeCustomer("phone", e.target.value)}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="field form-group">
                  <label className="control-label">Địa chỉ</label>
                  <div className="controls">
                    <input
                      className="input"
                      data-tip=""
                      data-for="_extends_popup_error"
                      name="address"
                      value={customer.address || ''}
                      onChange={(e) => onChangeCustomer("address", e.target.value)}
                      placeholder="Nhập địa chỉ"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="field form-group">
                  <label className="control-label">Khu vực</label>
                  <div className="controls">
                    <SelectDistricts
                      city={customer.city}
                      onSelect={(e) => onChangeSelectDistrict(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="field form-group">
                  <label className="control-label">Phường xã</label>
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
            <div className="row">
              <div className="col-md-6">
                <div className="field form-group">
                  <label className="control-label">Mã khách hàng</label>
                  <div className="controls">
                    <input
                      className="input"
                      data-tip=""
                      data-for="_extends_popup_error"
                      name="code"
                      value={customer.code || ''}
                      onChange={(e) => onChangeCustomer("code", e.target.value)}
                      placeholder="Nhập tên khách hàng"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="field form-group">
                  <label className="control-label">Email</label>
                  <div className="controls">
                    <input
                      className="input"
                      data-tip=""
                      data-for="_extends_popup_error"
                      name="email"
                      value={customer.email || ''}
                      onChange={(e) => onChangeCustomer("email", e.target.value)}
                      placeholder="Nhập Email"
                    />
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <React.Fragment>
          <Button variant="light" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Thêm mới
          </Button>
        </React.Fragment>
      </Modal.Footer>
    </Modal>
  );
}

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
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomerModal);
