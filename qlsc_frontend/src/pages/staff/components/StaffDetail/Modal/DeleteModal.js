import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router";
import { deleteStaff, getListStaff } from "../../../actions/staffAction";
import { connect } from "react-redux";
import { closeModal } from "../../../../../components/modal/modalActions";
import { toastError } from "../../../../../utils/toast";
import pushstate from "../../../../../utils/pushstate";

function DeleteModal(props) {
  const { onCloseModalDelete, onGetListStaff, deleteStaffModal, onDeleteStaff } = props;
  const handleClose = () => {
    onCloseModalDelete();
  };
  const onConfirm = () => {
    if (
      deleteStaffModal &&
      deleteStaffModal.data &&
      deleteStaffModal.data.staff &&
      deleteStaffModal.data.staff.id
    ) {
      onDeleteStaff([deleteStaffModal.data.staff.id]).then((json) => {
        if (json && json.success) {
          pushstate(props.history, `/staffs`);
        } else {
          toastError("Có lỗi xảy ra khi xóa nhân viên!");
        }
      });
    } else if (
      deleteStaffModal &&
      deleteStaffModal.data &&
      deleteStaffModal.data.ids &&
      deleteStaffModal.data.ids.length
    ) {
      onDeleteStaff(deleteStaffModal.data.ids).then((json) => {
        if (json && json.success) {
          onGetListStaff();
          onCloseModalDelete();
        } else {
          toastError("Có lỗi xảy ra khi xóa nhân viên!");
        }
      });
    } else {
      toastError("Lỗi không xác định");
    }
  };
  const renderText = () => {
    if (
      deleteStaffModal.data &&
      deleteStaffModal.data.staff &&
      deleteStaffModal.data.staff.name
    ) {
      return (
        <React.Fragment>
          Bạn có chắc chắn muốn xóa khách hàng{" "}
          <span style={{ fontWeight: 500 }}>
            {deleteStaffModal.data &&
              deleteStaffModal.data.staff &&
              deleteStaffModal.data.staff.name}
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
      size="lg"
      dialogClassName="modal-create-customer"
    >
      <Modal.Header closeButton>
        <div className="modal-title">
          <span>Xóa nhân viên</span>
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
    modal: { deleteStaffModal },
  } = state;
  return {
    deleteStaffModal,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCloseModalDelete: () => dispatch(closeModal("deleteStaffModal", {})),
  onDeleteStaff: (ids) => dispatch(deleteStaff(ids)),
  onGetListStaff: (search, option) => dispatch(getListStaff(search, option)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteModal));
