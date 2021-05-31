import React from 'react';

function Header() {
  return (
    <div className="d-flex align-items-center delivery-collation-order-row header">
      <div className="order">
        Mã linh kiện
      </div>
      <div className="track-code">
        Tên linh kiện
      </div>
      <div className="track-code">
        Loại
      </div>
      <div className="tenant">
        Số lượng
      </div>
      <div className="d-flex align-items-center tenant">
        Giá
      </div>
      <div className="d-flex align-items-center justify-content-center tenant">
        Trạng thái
      </div>
    </div>
  )
}

export default Header;
