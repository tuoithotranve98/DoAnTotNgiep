/* eslint-disable import/order */
import React, { useState } from "react";
import { withRouter } from "react-router";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { deleteCustomer, getListCustomer } from "../../../actions/customerAction";
import { closeModal } from "../../../../../components/modal/modalActions";
import { toastError } from "../../../../../utils/toast";
import pushstate from "../../../../../utils/pushstate";

function DeleteModal(props) {
  const { onCloseModalDelete, onDeleteCustomer, deleteCustomer, onGetCustomer } = props;
  const handleClose = () => {
    onCloseModalDelete();
  };
  const onConfirm = () => {
    if (
      deleteCustomer &&
      deleteCustomer.data &&
      deleteCustomer.data.customer &&
      deleteCustomer.data.customer.id
    ) {
      onDeleteCustomer([deleteCustomer.data.customer.id]).then((json) => {
        if (json ) {
          pushstate(props.history, `/customers`);
        } else {
          toastError("Có lỗi xảy ra khi xóa khách hàng!");
        }
      });
    } else if (
      deleteCustomer &&
      deleteCustomer.data &&
      deleteCustomer.data.ids &&
      deleteCustomer.data.ids.length
    ) {
      onDeleteCustomer(deleteCustomer.data.ids).then((json) => {
        if (json ) {
          onGetCustomer();
          onCloseModalDelete();
        } else {
          toastError("Có lỗi xảy ra khi xóa khách hàng!");
        }
      });
    } else {
      toastError("Lỗi không xác định");
    }
  };
  const renderText = () => {
    if (
      deleteCustomer.data &&
      deleteCustomer.data.customer &&
      deleteCustomer.data.customer.name
    ) {
      return (
        <React.Fragment>
          Bạn có chắc chắn muốn xóa khách hàng{" "}
          <span style={{ fontWeight: 500 }}>
            {deleteCustomer.data &&
              deleteCustomer.data.customer &&
              deleteCustomer.data.customer.name}
          </span>
          ? Thao tác này không thể khôi phục.
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          Thao tác này sẽ xóa các khách hàng bạn đã chọn. Thao tác này không thể
          khôi phục.
        </React.Fragment>
      );
    }
  };
  return (
    <Modal
      show
      onHide={handleClose}
      size="md"
      dialogClassName="modal-create-customer"
    >
      <Modal.Header closeButton>
        <div className="modal-title">
          <span>Xóa khách hàng</span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="content">{renderText()}</div>
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
const mapStateToProps = (state) => {
  const {
    modal: { deleteCustomer },
  } = state;
  return {
    deleteCustomer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCloseModalDelete: () => dispatch(closeModal("deleteCustomer", {})),
  onDeleteCustomer: (ids) => dispatch(deleteCustomer(ids)),
  onGetCustomer: (search, option) => dispatch(getListCustomer(search, option)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeleteModal)
);
