import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { closeModal } from "../../../../../components/modal/modalActions";
import { deleteMainCard, fetchMainCard } from "../../../actions/mainCard";
import { toastError } from "../../../../../utils/toast";

function DeleteModal(props) {
  const {
    onCloseModalDelete,
    onDeleteMaintenanceCard,
    onGetMaintenanceCard,
    deleteMaintenanCardModal,
  } = props;
  const handleClose = () => {
    onCloseModalDelete();
  };
  const onConfirm = () => {
    if (
      deleteMaintenanCardModal &&
      deleteMaintenanCardModal.data &&
      deleteMaintenanCardModal.data.ids &&
      deleteMaintenanCardModal.data.ids.length
    ) {
      onDeleteMaintenanceCard(deleteMaintenanCardModal.data.ids).then(
        (json) => {
          if (json) {
            onGetMaintenanceCard();
            onCloseModalDelete();
            
          } else {
            toastError("Có lỗi xảy ra");
          }
        }
      );
    } else {
      toastError("Lỗi không xác định");
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
          <span>Xóa phiếu sửa chữa</span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="content">
          Thao tác này sẽ xóa các phiếu sửa chữa bạn đã chọn. Thao tác này không
          thể khôi phục.
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

const mapStateToProps = (state) => {
  const {
    modal: { deleteMaintenanCardModal },
  } = state;
  return {
    deleteMaintenanCardModal,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCloseModalDelete: () =>
    dispatch(closeModal("deleteMaintenanCardModal", {})),
  onDeleteMaintenanceCard: (ids) => dispatch(deleteMainCard(ids)),
  onGetMaintenanceCard: (search, option) =>
    dispatch(fetchMainCard(search, option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
