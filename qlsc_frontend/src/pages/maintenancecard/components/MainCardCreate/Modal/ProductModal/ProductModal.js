/* eslint-disable import/order */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './styles.scss';
import { connect } from 'react-redux';

function CustomerModal(props) {
//   const { show } = props;
  const [show, setShow] = useState(true)
  const handleClose = () => {
    // setShow(false)
  };
  const onConfirm = () => {
  
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      dialogClassName="modal-create-customer"
    >
      <Modal.Header closeButton>
        <div className="modal-title">
          <span>
             Thêm mới sản phẩm
          </span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="content">
            
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
