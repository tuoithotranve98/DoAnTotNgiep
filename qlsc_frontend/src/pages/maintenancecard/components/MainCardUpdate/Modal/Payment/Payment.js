/* eslint-disable import/order */
import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./styles.scss";
import * as Icons from "pages/customer/commons/Icons";

function Payment(props) {
  const { setPayment,setMoney, money, payment, payments, showModalPayment, setShowModalPayment, onMainCardPaymentHistory,
    mainCardTotal,
    totalAfterPayment,
  } = props;
  const handleClose = () => {
    setPayment({});
    setShowModalPayment(false);
  };
  const renderPaymentLabel = () => {
    if (!payment.id) {
      return payments[0].name;
    }
    if (payment) {
      return payment.name;
    }
    return "Không có phương thức thanh toán nào";
  };
  const onClickShowPaymentMethod = () => {
    setPaid(!paid);
    setPaymentItem(payment[0]);
  };
  const total = mainCardTotal - totalAfterPayment();
  return (
    <Modal
      show={showModalPayment}
      onHide={handleClose}
      size="md"
      dialogClassName="modal-payment-method-data"
    >
      <Modal.Header closeButton>
        <div className="modal-title">
          <span>Xác nhận thông tin đối soát</span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="confim">
          <div className="row">
            <div className="col-md-6">
              <div className="filter-delivery-collations-option">
                <div className="title-option">Phương thức thanh toán</div>
                <button
                  type="button"
                  className="dropdown-toggle delivery-collations-dropdown-button"
                  data-toggle="dropdown"
                >
                  {renderPaymentLabel()}
                  <Icons.Arrow />
                </button>
                <div className="dropdown-menu delivery-collations-dropdown-menu">
                  {payments.map((item, index) => {
                    return (
                      <a
                        className="dropdown-item delivery-collations-dropdown-item"
                        key={index}
                        href
                        onClick={() => setPayment(item)}
                      >
                        {item.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="field form-group">
                <label className="control-label title-option">Số tiền thanh toán</label>
                <div className="controls">
                  <input
                    className="input"
                    data-tip=""
                    data-for="_extends_popup_error"
                    name="address"
                    value={total}
                    type="number"
                    onChange={(e)=>setMoney(e.target.value)}
                    placeholder="Số tiền thanh toán"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <React.Fragment>
          <Button variant="light" onClick={handleClose}>
            Thoát
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onMainCardPaymentHistory()
              handleClose();
              // setPaymentItem({})
            }}
          >
            Áp dụng
          </Button>
        </React.Fragment>
      </Modal.Footer>
    </Modal>
  );
}

export default Payment;
