/* eslint-disable no-restricted-globals */

import React from 'react';
import { connect } from 'react-redux';
import { ModalHeader, ModalBody, ModalFooter } from 'components/modal/component/Modal';
import { toggleModalAction } from 'components/modal/modalActions';

function CreateProductModal(props) {

  const {
    toggleModalAction,
  } = props;
  const { show } = props.createProductModal;
  if (show) {
    return (
      <div className="createProductModal modal_body ">
        <div className="modal-dialog" role="document">
          <div className="modal-content modal-change-version-auto-reply">
            <ModalHeader>
              <div className="">
                {' '}
              </div>
              <h6 className="title">
                Mời bạn trải nghiệm giao diện mới của Công cụ tự động
              </h6>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => toggleModalAction('createProductModal', {})}
              >
                <span aria-hidden="true">
                </span>
              </button>
            </ModalHeader>
            <ModalBody>
              <div
                className="align-items-center justify-content-between item"
              >
                <div
                  className="d-flex  body-content"
                >
                  <div className="icon">
                    {' '}
                  </div>
                  <div className="content-text">
                    <div className="cont-title">
                      Tiết kiệm thời gian thêm mới/chỉnh sửa kịch bản
                    </div>
                    <div className="cont-subtitle">
                      Thao tác được rút gọn, gợi ý trước một số phần thiết lập giúp bạn tạo mới kịch bản nhanh hơn.
                      {' '}
                    </div>
                  </div>
                </div>

                <div
                  className="d-flex body-content item-02"
                >
                  <div className="icon">
                    {' '}
                  </div>
                  <div className="content-text">
                    <div className="cont-title">
                      Theo dõi hiệu quả hoạt động của kịch bản
                    </div>
                    <div className="cont-subtitle">
                      {' '}
                      Thông qua những chỉ số thống kê như: số bình luận, tỷ lệ phản hồi ... đến trang
                    </div>
                  </div>
                </div>
                <div className="content-bottom">
                  <button
                    className="btn btn-white"
                    type="button"
                    onClick={() => toggleModalAction('createProductModal', {})}
                  >
                    Sử dụng giao diện cũ
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                  >
                    Trải nghiệm giao diện mới (BETA)
                  </button>
                </div>
              </div>
            </ModalBody>
          </div>
        </div>
        <div className="background_body" />
      </div>
    );
  }
  return null;
}
CreateProductModal.defaultProps = {
  createProductModal: {
    show: false,
    data: {},
  },
  toggleModalAction: () => {},
};

const mapStateToProps = (state) => {
  const { modal: { createProductModal } } = state;
  return {
    createProductModal,
  };
};
const mapDispatchToProps = (dispatch) => ({
  toggleModalAction: (modalName, data) => dispatch(toggleModalAction(modalName, data)),
});

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(CreateProductModal));
