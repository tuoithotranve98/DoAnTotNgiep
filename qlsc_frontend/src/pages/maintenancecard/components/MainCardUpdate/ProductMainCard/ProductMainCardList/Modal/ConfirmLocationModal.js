/* eslint-disable import/order */
import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Guard from 'components/general/loading/Guard';
import HeaderOrderConfirm from './HeaderOrderConfirm';
import ListOrderConfirm from './ListOrderConfirm';
import './styles.scss';
import { connect } from 'react-redux';
import { showModalOrderCollation, updateOrderCollation } from '../../../../../actions/deliveryCollation';

function ConfirmLocationModal(props) {
  const { setShowLocationModal, show, onChangeLocationId, tmpLocation } = props;
  const handleClose = () => {
    setShowLocationModal(false);
  };
  const onConfirm = () => {
    setShowLocationModal(false);
    props.updateOrderCollation([]);
    onChangeLocationId(tmpLocation);
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      dialogClassName="modal-delivery-collation-data-location"
    >
      <Modal.Header closeButton>
        <div className="modal-title">
          <span>
             Bạn có chắc chắn muốn thay đổi chi nhánh
          </span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="" style={{ textAlign: 'center', paddingTop: 15, paddingBottom: 15 }}>
            Thao tác thay đổi chi nhánh sẽ xóa hết đơn hàng trong phiếu đối soát
        </div>
      </Modal.Body>
      <Modal.Footer>
        <React.Fragment>
          <Button variant="light" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Xác nhận
          </Button>
        </React.Fragment>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  const { deliveryCollation: { ui: { showModal } } } = state;
  return {
    showModal,
  };
};
const mapDispatchToProps = (dispatch) => ({
  showModalOrderCollation: (show) => dispatch(showModalOrderCollation(show)),
  updateOrderCollation: (list) => dispatch(updateOrderCollation(list))
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmLocationModal);
