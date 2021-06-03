import React from "react";
import * as Icons from "pages/maintenancecard/commons/Icons";
import "../../styles/header.scss";
import { connect } from "react-redux";
import { openModal } from "../../../../../../../../components/modal/modalActions";

function Header(props) {
  const { selectedIds, onOpenModalDelete } = props;
  const onClickCreateMainCard = () => {
    onOpenModalDelete("deleteProductModal", { ids: selectedIds });
  };

  const renderBulkAction = () => {
    const { child, onClick, checked, minus } = props;

    return (
      <React.Fragment>
        <div className="d-flex dropdown dd-bulk-action product-bulk-action-dd">
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
      className="d-flex header-list product-header"
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
            Mã linh kiện
          </div>
          <div className="margin-right20 header-item order-collations-fulfillment">
            Tên linh kiên
          </div>
          <div className="margin-right20 header-item order-collations-loaction">
            Loại
          </div>
          <div className="margin-right20 header-item order-collations-status">
            Số lượng
          </div>
          <div className="margin-right20 header-item order-collations-channel-code">
            Đơn vị
          </div>
          <div className="margin-right20 header-item order-collations-total-amount">
            Giá mỗi đơn vị
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  onOpenModalDelete: (modalName, data) => dispatch(openModal(modalName, data)),
});
const mapStateToProps = (state, ownProps) => {
  const { auth : { user } } = state
  return {
    user
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
