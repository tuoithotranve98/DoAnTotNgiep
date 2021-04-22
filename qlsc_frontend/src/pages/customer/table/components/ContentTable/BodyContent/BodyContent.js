import React from "react";
import Checkbox from "components/buttons/Checkbox";
import "./bodyContent.scss";

function BodyContent(props) {
  const { customers } = props;
  return (
    <div className="customer-list-container">
      <div className="d-flex customer-item">
        <Checkbox checked onCheck />
        <div className="margin-right20 item-list item-id">CustomerId</div>
        <div className="margin-right20 item-list item-name">
          Teen khach hang
        </div>
        <div className="margin-right20 item-list item-date">Ngay tao kh</div>
        <div className="margin-right20 item-list item-phone">Số điện thoại</div>
        <div className="margin-right20 item-list item-address">Địa chỉ</div>
      </div>
    </div>
  );
}

export default BodyContent;
