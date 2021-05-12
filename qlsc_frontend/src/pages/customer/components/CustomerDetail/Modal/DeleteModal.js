/* eslint-disable import/order */
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { deleteCustomer } from "../../../actions/customerAction";
import { closeModal } from '../../../../../components/modal/modalActions';
import { toastError } from "../../../../../utils/toast";

function DeleteModal(props) {
  const { onCloseModalDelete, onDeleteCustomer } = props;
  const handleClose = () => {
    onCloseModalDelete();
  };
  const onConfirm = () => {
    onDeleteCustomer().then((json) => {
      if (json && json.success) {
        debugger;
      } else {
        toastError("Có lỗi xảy ra khi xóa khách hàng!");
      }
    })
  };
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
  onDeleteCustomer:(ids) => dispatch(deleteCustomer(ids)),
});
export default connect(null, mapDispatchToProps)(DeleteModal);
