/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { withRouter } from "react-router-dom";
import pushstate from "utils/pushstate";
import "./styles.scss";

function TopBar(props) {
  const getTopBarText = () => {
    const { history } = props;
    const url = props.location ? props.location.pathname : "";
    if (url.includes("/customers")) {
      return (
        <React.Fragment>
          <span
            className="header-top-bar-text"
            onClick={() => pushstate(history, "/customers")}
          >
            Khách hàng
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Danh sách khách hàng</span>
        </React.Fragment>
      );
    }

    if (url.includes("/customer/create")) {
      return (
        <React.Fragment>
          <span
            className="header-top-bar-text"
            onClick={() => pushstate(history, "/customers")}
          >
            Khách hàng
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Thêm mới khách hàng</span>
        </React.Fragment>
      );
    }

    if (url.includes("/customer/update/")) {
      const split = url.split("/customer/update/");
      if (split.length > 1) {
        const id = Number(split[1]);
        if (id) {
          return (
            <React.Fragment>
              <span
                className="header-top-bar-text"
                onClick={() => pushstate(history, "/customers")}
              >
                Khách hàng
              </span>
              <span>&nbsp;{">"}&nbsp;</span>
              <span>Cập nhật khách hàng</span>
            </React.Fragment>
          );
        }
      }
    }

    if (url.includes("/customer/detail/")) {
      const split = url.split("/customer/detail/");
      if (split.length > 1) {
        const id = Number(split[1]);
        if (id) {
          return (
            <React.Fragment>
              <span
                className="header-top-bar-text"
                onClick={() => pushstate(history, "/customers")}
              >
                Khách hàng
              </span>
              <span>&nbsp;{">"}&nbsp;</span>
              <span>Chi tiết khách hàng</span>
            </React.Fragment>
          );
        }
      }
    }
    if (url.includes("/staffs")) {
      return (
        <React.Fragment>
          <span
            className="header-top-bar-text"
            onClick={() => pushstate(history, "/staffs")}
          >
            Nhân viên
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Danh sách nhân viên</span>
        </React.Fragment>
      );
    }

    if (url.includes("/staff/create")) {
      return (
        <React.Fragment>
          <span
            className="header-top-bar-text"
            onClick={() => pushstate(history, "/staffs")}
          >
            Nhân viên
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Thêm mới nhân viên</span>
        </React.Fragment>
      );
    }

    if (url.includes("/staff/update/")) {
      const split = url.split("/staff/update/");
      if (split.length > 1) {
        const id = Number(split[1]);
        if (id) {
          return (
            <React.Fragment>
              <span
                className="header-top-bar-text"
                onClick={() => pushstate(history, "/staffs")}
              >
                Nhân viên
              </span>
              <span>&nbsp;{">"}&nbsp;</span>
              <span>Cập nhật nhân viên</span>
            </React.Fragment>
          );
        }
      }
    }

    if (url.includes("/staff/detail/")) {
      const split = url.split("/staff/detail/");
      if (split.length > 1) {
        const id = Number(split[1]);
        if (id) {
          return (
            <React.Fragment>
              <span
                className="header-top-bar-text"
                onClick={() => pushstate(history, "/staffs")}
              >
                Nhân viên
              </span>
              <span>&nbsp;{">"}&nbsp;</span>
              <span>Chi tiết nhân viên</span>
            </React.Fragment>
          );
        }
      }
    }

    if (url.includes("/products")) {
      return (
        <React.Fragment>
          <span
            className="header-top-bar-text"
            onClick={() => pushstate(history, "/products")}
          >
            Sản phẩm
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Danh sách sản phẩm</span>
        </React.Fragment>
      );
    }

    if (url.includes("/product/create")) {
      return (
        <React.Fragment>
          <span
            className="header-top-bar-text"
            onClick={() => pushstate(history, "/products")}
          >
            Sản phẩm
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Thêm mới sản phẩm</span>
        </React.Fragment>
      );
    }

    if (url.includes("/product/detail/")) {
      const split = url.split("/product/detail/");
      if (split.length > 1) {
        const id = Number(split[1]);
        if (id) {
          return (
            <React.Fragment>
              <span
                className="header-top-bar-text"
                onClick={() => pushstate(history, "/products")}
              >
                Sản phẩm
              </span>
              <span>&nbsp;{">"}&nbsp;</span>
              <span>Chi tiết sản phẩm</span>
            </React.Fragment>
          );
        }
      }
    }

    if (url.includes("/maintenance-cards")) {
      return (
        <React.Fragment>
          <span
            className="header-top-bar-text"
            onClick={() => pushstate(history, "/maintenance-cards")}
          >
            Phiếu sửa chữa
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Danh sách phiếu sửa chữa</span>
        </React.Fragment>
      );
    }

    if (url.includes("/maintenance-card/create")) {
      return (
        <React.Fragment>
          <span
            className="header-top-bar-text"
            onClick={() => pushstate(history, "/maintenance-cards")}
          >
            Phiếu sửa chữa
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Chi tiết phiếu sửa chữa</span>
        </React.Fragment>
      );
    }

    if (url.includes("/maintenance-card/detail/")) {
      const split = url.split("/product/detail/");
      if (split.length > 1) {
        const id = Number(split[1]);
        if (id) {
          return (
            <React.Fragment>
              <span
                className="header-top-bar-text"
                onClick={() => pushstate(history, "/maintenance-cards")}
              >
                Phiếu sửa chữa
              </span>
              <span>&nbsp;{">"}&nbsp;</span>
              <span>Chi tiết phiếu sửa chữa</span>
            </React.Fragment>
          );
        }
      }
    }

    if (url.includes("/report")) {
      return (
        <React.Fragment>
          <span className="header-top-bar-text">Báo cáo</span>
        </React.Fragment>
      );
    }

    if (url.includes("/")) {
      return (
        <React.Fragment>
          <span className="header-top-bar-text">Tổng quan</span>
        </React.Fragment>
      );
    }

    return `unknown: ${url}`;
  };

  return (
    <div id="top-bar-market-place">
      {/* <div className="top-bar-text">
        <span
          className="top_bar_focus"
          onClick={this.onClick}
          style={!url.includes('settings/custom_init') && !url.includes('settings/init') ? {} : { pointerEvents: 'none' }}
        >
          Sàn TMĐT
        </span>
        {' >'}
      </div> */}
      <div className="top-bar-text">{getTopBarText()}</div>
    </div>
  );
}

export default withRouter(TopBar);
