import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as Icons from "pages/product/commons/Icons";
import "./styles.scss";
function Accessories(props) {
  const {
    product,
    onchangeValue,
    handleUploadImage,
    removeImage,
    actionSave,
    onChangeStatusValid,
  } = props;

  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidPrice, setIsInvalidPrice] = useState(false);
  const [isInvalidQuantity, setIsInvalidQuantity] = useState(false);
  const [isInvalidUnit, setIsInvalidUnit] = useState(false);

  useEffect(() => {
    if (actionSave) {
      if (!product.name) setIsInvalidName(true);
      if (!product.pricePerUnit) setIsInvalidPrice(true);
      if (!product.quantity) setIsInvalidQuantity(true);
      if (!product.unit) setIsInvalidUnit(true);
    }
  }, [actionSave]);

  useEffect(() => {
    if (product.name) setIsInvalidName(false);
  }, [product.name]);

  useEffect(() => {
    if (product.pricePerUnit) setIsInvalidPrice(false);
  }, [product.pricePerUnit]);

  useEffect(() => {
    if (product.quantity) setIsInvalidQuantity(false);
  }, [product.quantity]);

  useEffect(() => {
    if (product.unit) setIsInvalidUnit(false);
  }, [product.unit]);

  const onBlurUnit = () => {
    if (!product.unit) {
      onChangeStatusValid(true);
      setIsInvalidUnit(true);
    } else {
      onChangeStatusValid(false);
    }
  };

  const onBlurQuantity = () => {
    if (!product.quantity) {
      onChangeStatusValid(true);
      setIsInvalidQuantity(true);
    } else {
      onChangeStatusValid(false);
    }
  };

  const onBlurPrice = () => {
    if (!product.pricePerUnit) {
      onChangeStatusValid(true);
      setIsInvalidPrice(true);
    } else {
      onChangeStatusValid(false);
    }
  };

  const onBlurName = () => {
    if (!product.name) {
      onChangeStatusValid(true);
      setIsInvalidName(true);
    } else {
      onChangeStatusValid(false);
    }
  };

  const inputRef = useRef();
  const onOpenFile = () => {
    if (inputRef) inputRef.current.click();
  };
  const uploadFile = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    if (
      product.images.length + uploadedFiles.length > 5 ||
      uploadedFiles.length > 5
    ) {
      toastError("Bạn chỉ được chọn tối đa 5 ảnh");
    } else {
      handleUploadImage(uploadedFiles);
    }
    e.target.value = "";
  };

  return (
    <React.Fragment>
      <div className="col-md-9">
        <div className="info-product-left">
          <div className="card info-product-left-01">
            <div className="title">Thông tin Linh kiện</div>
            <div className="content">
              <div className="row">
                <div className="col-md-6">
                  <div className="field form-group">
                    <span style={{ color: "red", marginRight: "4px" }}>*</span>
                    <label className="control-label">Tên linh kiện</label>
                    <div className="controls">
                      <input
                        className="input"
                        data-tip=""
                        data-for="_extends_popup_error"
                        name="name"
                        style={isInvalidName ? { border: "1px solid red" } : {}}
                        onBlur={() => onBlurName()}
                        value={product.name || ""}
                        onChange={(e) => onchangeValue("name", e.target.value)}
                        placeholder="Nhập tên linh kiện"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="field form-group">
                    <span style={{ color: "red", marginRight: "4px" }}>*</span>
                    <label className="control-label">Giá </label>
                    <div className="controls">
                      <input
                        className="input"
                        data-tip=""
                        data-for="_extends_popup_error"
                        name="pricePerUnit"
                        style={
                          isInvalidPrice ? { border: "1px solid red" } : {}
                        }
                        onBlur={() => onBlurPrice()}
                        value={product.pricePerUnit || ""}
                        onChange={(e) =>
                          onchangeValue("pricePerUnit", e.target.value)
                        }
                        placeholder="Nhập giá linh kiện"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="field form-group">
                    <span style={{ color: "red", marginRight: "4px" }}>*</span>
                    <label className="control-label">Số lượng</label>
                    <div className="controls">
                      <input
                        className="input"
                        data-tip=""
                        data-for="_extends_popup_error"
                        name="quantity"
                        style={
                          isInvalidQuantity ? { border: "1px solid red" } : {}
                        }
                        onBlur={() => onBlurQuantity()}
                        value={product.quantity || ""}
                        onChange={(e) =>
                          onchangeValue("quantity", e.target.value)
                        }
                        placeholder="Nhập số lượng"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="field form-group">
                    <span style={{ color: "red", marginRight: "4px" }}>*</span>
                    <label className="control-label">Đơn vị</label>
                    <div className="controls">
                      <input
                        className="input"
                        data-tip=""
                        data-for="_extends_popup_error"
                        name="unit"
                        style={isInvalidUnit ? { border: "1px solid red" } : {}}
                        onBlur={() => onBlurUnit()}
                        value={product.unit || ""}
                        onChange={(e) => onchangeValue("unit", e.target.value)}
                        placeholder="Nhập đơn vị"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="field form-group">
                    <label className="control-label">Mã linh kiện</label>
                    <div className="controls">
                      <input
                        className="input"
                        data-tip=""
                        data-for="_extends_popup_error"
                        name="code"
                        value={product.code || ""}
                        onChange={(e) => onchangeValue("code", e.target.value)}
                        placeholder="Nhập mã linh kiện"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="field form-group">
                    <label className="control-label">Mô tả</label>
                    <div className="controls">
                      <textarea
                        name="description"
                        placeholder="Nhập mô tả"
                        value={product.description || ""}
                        onChange={(e) =>
                          onchangeValue("description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="info-product-right">
          <div className="card info-product-right-01">
            <div className="title">Ảnh linh kiện</div>
            {product.images && !product.images.length ? (
              <React.Fragment>
                <div className="content-image" onClick={() => onOpenFile()}>
                  <Icons.ImageProduct />
                </div>
                <div
                  className="text-center text-image"
                  onClick={() => onOpenFile()}
                >
                  Bấm vào đây để thêm mới ảnh
                </div>
                <input
                  type="file"
                  className="display-none"
                  ref={inputRef}
                  accept="image/*"
                  onChange={(e) => uploadFile(e)}
                  multiple
                />
              </React.Fragment>
            ) : (
              <div className="preview-image">
                <div className="image-input" onClick={() => onOpenFile()}>
                  <input
                    type="file"
                    className="display-none"
                    ref={inputRef}
                    accept="image/*"
                    onChange={(e) => uploadFile(e)}
                    multiple
                  />
                  <Icons.addImgIcon />
                </div>
                {product.images.map((image, index) => {
                  return (
                    <div className="wrapper-image" key={index}>
                      <img
                        key={index}
                        className="image"
                        src={image}
                        alt={image}
                      />
                      <span
                        className="remove-img"
                        onClick={() => removeImage(index)}
                      >
                        x
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
Accessories.defaultProps = {};

export default React.memo(connect(null, null)(Accessories));
