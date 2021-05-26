import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./styles.scss";
function Service(props) {
  const { product, onchangeValue, actionSave, onChangeStatusValid } = props;
  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidPrice, setIsInvalidPrice] = useState(false);

  useEffect(() => {
    if (actionSave) {
      if (!product.name) setIsInvalidName(true);
      if (!product.pricePerUnit) setIsInvalidPrice(true);
    }
  }, [actionSave]);
  useEffect(() => {
    if (product.name) setIsInvalidName(false);
  }, [product.name]);

  useEffect(() => {
    if (product.pricePerUnit) setIsInvalidPrice(false);
  }, [product.pricePerUnit]);

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

  return (
    <div className="col-md-12">
      <div className="info-product-left">
        <div className="card info-product-left-01">
          <div className="title">Thông tin Dịch vụ</div>
          <div className="content">
            <div className="row">
              <div className="col-md-4">
                <div className="field form-group">
                  <span style={{ color: "red", marginRight: "4px" }}>*</span>
                  <label className="control-label">Tên dịch vụ</label>
                  <div className="controls">
                    <input
                      className="input"
                      data-tip=""
                      data-for="_extends_popup_error"
                      name="name"
                      value={product.name || ""}
                      style={isInvalidName ? { border: "1px solid red" } : {}}
                      onBlur={() => onBlurName()}
                      onChange={(e) => onchangeValue("name", e.target.value)}
                      placeholder="Nhập tên dịch vụ"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="field form-group">
                  <span style={{ color: "red", marginRight: "4px" }}>*</span>
                  <label className="control-label">Giá dịch vụ</label>
                  <div className="controls">
                    <input
                      className="input"
                      data-tip=""
                      data-for="_extends_popup_error"
                      name="pricePerUnit"
                      style={isInvalidPrice ? { border: "1px solid red" } : {}}
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
              <div className="col-md-4">
                <div className="field form-group">
                  <label className="control-label">Mã dịch vụ</label>
                  <div className="controls">
                    <input
                      className="input"
                      data-tip=""
                      data-for="_extends_popup_error"
                      name="code"
                      value={product.code || ""}
                      onChange={(e) => onchangeValue("code", e.target.value)}
                      placeholder="Nhập mã dịch vụ"
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
  );
}
Service.defaultProps = {};

export default React.memo(connect(null, null)(Service));
