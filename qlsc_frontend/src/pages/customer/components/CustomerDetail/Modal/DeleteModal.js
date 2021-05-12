/* eslint-disable import/order */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { closeModal } from '../../../../../components/modal/modalActions';

function DeleteModal(props) {
  const { onCloseModalDelete } = props;
  const handleClose = () => {
    onCloseModalDelete();
  };
  const onConfirm = () => {};
  return (
    <Modal
      show
      onHide={handleClose}
      size="lg"
      dialogClassName="modal-create-customer"
    >
      <Modal.Header closeButton>
        <div className="modal-title">
          <span>Xóa khách hàng</span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="content">
    aaaaaaaaaaaaaaaaa
        </div>
      </Modal.Body>
      <Modal.Footer>
        <React.Fragment>
          <Button variant="light" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Xóa
          </Button>
        </React.Fragment>
      </Modal.Footer>
    </Modal>
  );
}
const mapDispatchToProps = (dispatch) => ({
  onCloseModalDelete: () => dispatch(closeModal("deleteCustomer", {})),
});
export default connect(null, mapDispatchToProps)(DeleteModal);
