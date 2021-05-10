/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useHistory } from 'react-router';
import * as Icons from 'pages/customer/commons/Icons';
import '../../styles/header.scss';
import { connect } from 'react-redux';

function Header(props) {
  const deleteHistoryMainCard = () => {
    alert("xin cahfo")
  };

  const renderBulkAction = () => {
    const {
      child, onClick, checked, minus
    } = props;

    return (
      <React.Fragment>
        <div className="d-flex dropdown dd-bulk-action delivery-collations-bulk-action-dd">
          <div className="d-flex checkbox-wrapper">
            {
              minus ? (
                <div role="presentation" className="checkbox header-checkbox" onClick={() => onClick()}>
                  <Icons.Minus />
                </div>
              ) : (
                <div role="presentation" className="checkbox header-checkbox" onClick={() => onClick()}>
                  <input
                    type="checkbox"
                    name="check"
                    checked={checked}
                    readOnly
                  />
                  <label />
                </div>
              )
            }
            {child}
          </div>
          <button
            className="btn btn-default dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ borderRadius: '0px 4px 4px 0px' }}
          >
            Lựa chọn thao tác
          </button>
          <div className="dropdown-menu bulk-dd-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" onClick={() => deleteHistoryMainCard()}>Xoá</a>
          </div>
        </div>
      </React.Fragment>
    );
  };
  const { onClick, checked, minus } = props;
  return (
    <div className="d-flex header-list history-main-card-header" style={{ padding: checked || minus ? '0px 0 8px' : '' }}>
      {
          checked || minus ? null : (
            <div className="checkbox header-checkbox" onClick={() => onClick()}>
              <input
                type="checkbox"
                name="check"
                checked={checked}
                readOnly
              />
              <label />
            </div>
          )
        }
      {
          checked || minus ? (
            renderBulkAction()
          ) : (
            <React.Fragment>
              <div className="">
                &nbsp;&nbsp;
              </div>
              <div className="margin-right20 header-item order-collations-code">
                Mã phiếu
              </div>
              <div className="margin-right20 header-item order-collations-fulfillment">
                Biển số xe
              </div>
              <div className="margin-right20 header-item order-collations-loaction">
                NV điều phối
              </div>
              <div className="margin-right20 header-item order-collations-status">
                NV sửa chữa
              </div>
              <div className="margin-right20 header-item order-collations-status">
                Trạng thái thanh toán
              </div>
              <div className="margin-right20 header-item order-collations-status">
                Trạng thái công việc
              </div>
              <div className="margin-right20 header-item order-collations-status">
                Ngày trả xe
              </div>
            </React.Fragment>
          )
        }
    </div>
  );
}
;
export default connect(null, null)(Header);
