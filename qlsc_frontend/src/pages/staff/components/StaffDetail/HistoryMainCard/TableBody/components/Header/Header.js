/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router";
import * as Icons from "pages/maintenancecard/commons/Icons";
import "../../styles/header.scss";
import { connect } from "react-redux";

function Header(props) {
  const history = useHistory();
  const { filterInfo } = props;
  const onClickCreateMainCard = () => {
    alert("xin cahfo");
  };

  const renderBulkAction = () => {
    const { child, onClick, checked, minus } = props;

    return (
      <React.Fragment>
        <div className="d-flex dropdown dd-bulk-action delivery-collations-bulk-action-dd">
          <div className="d-flex checkbox-wrapper">
            {minus ? (
              <div
                role="presentation"
                className="checkbox header-checkbox"
                onClick={() => onClick()}
              >
                <Icons.Minus />
              </div>
            ) : (
              <div
                role="presentation"
                className="checkbox header-checkbox"
                onClick={() => onClick()}
              >
                <input
                  type="checkbox"
                  name="check"
                  checked={checked}
                  readOnly
                />
                <label />
              </div>
            )}
            {child}
          </div>
          <button
            className="btn btn-default dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Lựa chọn thao tác
          </button>
          <div
            className="dropdown-menu bulk-dd-menu"
            aria-labelledby="dropdownMenuButton"
          >
            {props.user && props.user.role && props.user.role !== 2 ? (
              <a
                className="dropdown-item"
                onClick={() => onClickCreateMainCard()}
              >
                Xoá
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </React.Fragment>
    );
  };
  const { onClick, checked, minus } = props;
  return (
    <div
      className="d-flex header-list delivery-collations-header"
      style={{ padding: checked || minus ? "0px 0 8px" : "" }}
    >
      {checked || minus ? null : (
        <div className="checkbox header-checkbox" onClick={() => onClick()}>
          <input type="checkbox" name="check" checked={checked} readOnly />
          <label />
        </div>
      )}
      {checked || minus ? (
        renderBulkAction()
      ) : (
        <React.Fragment>
          <div className="">&nbsp;&nbsp;</div>
          <div className="margin-right20 header-item order-collations-code">
            Mã khách hàng
          </div>
          <div className="margin-right20 header-item order-collations-fulfillment">
            Tên khách hàng
          </div>
          <div className="margin-right20 header-item order-collations-loaction">
            Số điện thoại
          </div>
          <div className="margin-right20 header-item order-collations-status">
            Email
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  const {
    mainCard: {
      filterInfo,
      mainCard: { checkCreate },
    },
    auth: { user },
  } = state;
  return {
    checkCreate,
    filterInfo,
    user,
  };
};
export default connect(mapStateToProps, null)(Header);
