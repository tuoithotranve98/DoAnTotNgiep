import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { closeModal } from "../../../../../components/modal/modalActions";
import { deleteProductService, getProductService } from "../../../actions/ProductAction";
import { toastError } from "../../../../../utils/toast";

function DeleteModal(props) {
  const { onCloseModalDelete, onDeleteProductService, onGetProductService, deleteProductModal } = props;
  const handleClose = () => {
    onCloseModalDelete();
  };
  const onConfirm = () => {
    if (
      deleteProductModal &&
      deleteProductModal.data &&
      deleteProductModal.data.ids &&
      deleteProductModal.data.ids.length
    ) {
      onDeleteProductService(deleteProductModal.data.ids).then((json) => {
        if (json ) {
          onGetProductService();
          onCloseModalDelete();
        } else {
          toastError("Có lỗi xảy ra khi xóa sản phẩm dịch vụ!");
        }
      });
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
          <span>Xóa sản phẩm dịch vụ</span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="content">
          Thao tác này sẽ xóa các khách hàng bạn đã chọn. Thao tác này không thể
          khôi phục.
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
    modal: { deleteProductModal },
  } = state;
  return {
    deleteProductModal,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCloseModalDelete: () => dispatch(closeModal("deleteProductModal", {})),
  onDeleteProductService: (ids) => dispatch(deleteProductService(ids)),
  onGetProductService: (search, option) =>
    dispatch(getProductService(search, option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
