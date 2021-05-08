/* eslint-disable import/order */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./styles.scss";
import { connect } from "react-redux";

function CustomerModal(props) {
  //   const { show } = props;
  const [show, setShow] = useState(true);
  const handleClose = () => {
    // setShow(false)
  };
  const onConfirm = () => {};
  return (
    <Modal
      show={show}
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
                      placeholder="Nhập tên sản phẩm"
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
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="field form-group">
                  <label className="control-label">Khu vực</label>
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
                  <label className="control-label">Phường xã</label>
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
                  <label className="control-label">Mã khách hàng</label>
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
                  <label className="control-label">Ngày sinh</label>
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
                  <label className="control-label">Email</label>
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
                  <label className="control-label">Giới tính</label>
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

export default connect(null, null)(CustomerModal);
