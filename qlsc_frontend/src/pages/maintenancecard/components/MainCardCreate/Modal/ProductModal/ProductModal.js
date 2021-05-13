/* eslint-disable import/order */
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './styles.scss';
import { connect } from 'react-redux';
import TitleAndAction from './TitleAndAction/TitleAndAction';
import Service from './Service/Service';
import Accessories from './Accessories/Accessories';
import { upLoadImage } from '../../../../../product/actions/ProductAction';

function CustomerModal(props) {
  const { onUpLoadImage, product, onchangeProduct, showModalProduct,
     setShowModalProduct,
     setCreateProduct,
     initialStateProduct,
     saveProductService,
     showContent,
     setShowContent,
  } = props;
  const handleClose = () => {
    setCreateProduct(initialStateProduct)
    setShowModalProduct(false)
  };
  const onConfirm = () => {
    saveProductService()
  };
  const handleUploadImage = (file) => {
    onUpLoadImage(file)
      .then((json) => {
        if (json && json.data) {
          const images = [...product.images, json.data];
          onchangeProduct("images", images);
        }
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  };

  const handleChange = () => {
    if (showContent === 1) {
      setShowContent(2);
    } else {
      setShowContent(1);
    }
  };

  const renderContent = () => {
    if (showContent === 1) {
      return (
        <Accessories
          product={product}
          onchangeValue={onchangeProduct}
          handleUploadImage={handleUploadImage}
        />
      );
    }
    if (showContent === 2) {
      return <Service product={product} onchangeValue={onchangeProduct} />;
    }
  };
  return (
    <Modal
      show={showModalProduct}
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
        <div className="content" style={{ position: 'relative'}}>
        <TitleAndAction setShowContent={handleChange} />
        <div className="row">
          {renderContent()}
      </div>
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
const mapDispatchToProps = (dispatch) => ({
  onUpLoadImage: (file) => dispatch(upLoadImage(file)),
});
export default connect(null, mapDispatchToProps)(CustomerModal);
