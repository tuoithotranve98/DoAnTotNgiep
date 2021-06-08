import React from "react";

function Header() {
  return (
    <div className="d-flex align-items-center delivery-collation-order-row header">
      <div className="order item-list">Mã</div>
      <div className="track-code item-list">Tên</div>
      <div className="track-code item-list">Loại</div>
      <div className="tenant item-list">Số lượng</div>
      <div className="d-flex align-items-center tenant item-list">Đơn giá</div>
      <div className="d-flex item-list">Bảo hành</div>
      <div className="d-flex align-items-center justify-content-center tenant item-list">
        Trạng thái
      </div>
    </div>
  );
}

export default Header;
