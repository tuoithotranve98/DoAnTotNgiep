import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as Icons from "pages/product/commons/Icons";
import "./styles.scss";
function Accessories(props) {
  const { product, onchangeValue, handleUploadImage } = props;
  useEffect(() => {}, []);
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
      console.error("Bạn chỉ được chọn tối đa 5 ảnh");
    } else {
      uploadedFiles.forEach((file) => {
        handleUploadImage(file);
      });
    }
    e.target.value = "";
  };

  return (
    <React.Fragment>
      <div className="col-md-12">
        <div className="card-main-info-product-left">
          <div className="card-main info-product-left-01">
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
                      value={product.name || ""}
                      onChange={(e) => onchangeValue("name", e.target.value)}
                      placeholder="Nhập tên linh kiện"
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
                      value={product.pricePerUnit || ""}
                      onChange={(e) =>
                        onchangeValue("pricePerUnit", e.target.value)
                      }
                      placeholder="Nhập giá sản phẩm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-6">
                <div className="card-main-info-product-right">
                  <div className="card-main info-product-right-01">
                    {product.images && !product.images.length ? (
                      <React.Fragment>
                        <div
                          className="content-image"
                          onClick={() => onOpenFile()}
                        >
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
                        <div
                          className="image"
                          style={{ background: "red" }}
                          onClick={() => onOpenFile()}
                        >
                          <input
                            type="file"
                            className="display-none"
                            ref={inputRef}
                            accept="image/*"
                            onChange={(e) => uploadFile(e)}
                            multiple
                          />
                        </div>
                        {product.images.map((image, index) => {
                          return (
                            <img
                              key={index}
                              className="image"
                              src={image}
                              alt={image}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="field form-group">
                  <span style={{ color: "red", marginRight: "4px" }}>*</span>
                  <label className="control-label">Số lượng</label>
                  <div className="controls">
                    <input
                      className="input"
                      data-tip=""
                      data-for="_extends_popup_error"
                      name="quantity"
                      value={product.quantity || ""}
                      onChange={(e) =>
                        onchangeValue("quantity", e.target.value)
                      }
                      placeholder="Nhập số lượng"
                    />
                  </div>
                </div>
                <div className="field form-group">
                  <span style={{ color: "red", marginRight: "4px" }}>*</span>
                  <label className="control-label">Đơn vị</label>
                  <div className="controls">
                    <input
                      className="input"
                      data-tip=""
                      data-for="_extends_popup_error"
                      name="unit"
                      value={product.unit || ""}
                      onChange={(e) => onchangeValue("unit", e.target.value)}
                      placeholder="Nhập đơn vị"
                    />
                  </div>
                </div>
                <div className="field form-group">
                  <span style={{ color: "red", marginRight: "4px" }}>*</span>
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
      <div className="col-md-12"></div>
    </React.Fragment>
  );
}
Accessories.defaultProps = {};

export default React.memo(connect(null, null)(Accessories));
