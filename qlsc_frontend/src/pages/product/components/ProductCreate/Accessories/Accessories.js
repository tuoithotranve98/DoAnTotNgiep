import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as Icons from "pages/product/commons/Icons";
import "./styles.scss";
function Accessories(props) {
  const {} = props;
  useEffect(() => {}, []);
  const inputRef = useRef();
  const onOpenFile = () => {
    if (inputRef) inputRef.current.click();
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
                        placeholder="Nhập tên sản phẩm"
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
                        name="name"
                        placeholder="Nhập tên sản phẩm"
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
                        name="name"
                        placeholder="Nhập tên sản phẩm"
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
                        name="name"
                        placeholder="Nhập tên sản phẩm"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="field form-group">
                    <span style={{ color: "red", marginRight: "4px" }}>*</span>
                    <label className="control-label">Mã linh kiện</label>
                    <div className="controls">
                      <input
                        className="input"
                        data-tip=""
                        data-for="_extends_popup_error"
                        name="name"
                        placeholder="Nhập tên sản phẩm"
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
                      <textarea name="description" placeholder="Mô tả" />
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
            <div className="title">Ảnh sản phẩm</div>
            <div className="content-image" onClick={()=> onOpenFile()}>
              <Icons.ImageProduct />
            </div>
            <div className="text-center text-image" onClick={()=> onOpenFile()}>Bấm vào đây để thêm mới ảnh</div>
            <input
              type="file"
              className="display-none"
              ref={inputRef}
              accept="*"
              // onChange={e => uploadFile(e)}
              multiple
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
Accessories.defaultProps = {};

export default React.memo(connect(null, null)(Accessories));
