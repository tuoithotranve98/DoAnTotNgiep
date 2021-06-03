/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import pushstate from "utils/pushstate";
import { changeShowFeedBack } from "../../actions/globalUiActions";
import * as Icons from "./Icons";
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
            Linh kiện
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Danh sách Linh kiện</span>
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
            Linh kiện
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Thêm mới Linh kiện</span>
        </React.Fragment>
      );
    }

    if (url.includes("/product/update")) {
      return (
        <React.Fragment>
          <span
            className="header-top-bar-text"
            onClick={() => pushstate(history, "/products")}
          >
            Linh kiện
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Cập nhật Linh kiện</span>
        </React.Fragment>
      );
    }

    if (url.includes("/services")) {
      return (
        <React.Fragment>
          <span
            className="header-top-bar-text"
            onClick={() => pushstate(history, "/services")}
          >
            Dịch vụ
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Danh sách Dịch vụ</span>
        </React.Fragment>
      );
    }

    if (url.includes("/service/create")) {
      return (
        <React.Fragment>
          <span
            className="header-top-bar-text"
            onClick={() => pushstate(history, "/services")}
          >
            Dịch vụ
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Thêm mới Dịch vụ</span>
        </React.Fragment>
      );
    }

    if (url.includes("/service/update")) {
      return (
        <React.Fragment>
          <span
            className="header-top-bar-text"
            onClick={() => pushstate(history, "/services")}
          >
            Dịch vụ
          </span>
          <span>&nbsp;{">"}&nbsp;</span>
          <span>Cập nhật Dịch vụ</span>
        </React.Fragment>
      );
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
          <span>Danh sách phiếu</span>
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
          <span>Thêm mới phiếu sửa chữa</span>
        </React.Fragment>
      );
    }

    if (url.includes("/maintenance-card/detail/")) {
      const split = url.split("/maintenance-card/detail/");
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

    if (url.includes("/home")) {
      return (
        <React.Fragment>
          <span className="header-top-bar-text">Tổng quan</span>
        </React.Fragment>
      );
    }

    if (url.includes("/")) {
      return (
        <React.Fragment>
          <span className="header-top-bar-text">{/* Tổng quan */}</span>
        </React.Fragment>
      );
    }

    return `unknown: ${url}`;
  };

  return (
    <div className="d-flex top-bar-market-place">
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
      <div className="d-flex top-bar-action">
        {/* <div className="icon-help">
          <Icons.iconHelp />
          <span>Trợ giúp</span>
        </div> */}
        <div
          className="icon-feed-back"
          onClick={() => props.changeShowFeedBack(true)}
        >
          <Icons.iconFeedback />
          <span>Góp ý</span>
        </div>
        <ul className="nav menu-bottom">
          <li className="user">
            <a href="#" data-toggle="dropdown">
              <Icons.iconUpdate />
              <span>Thông báo</span>
              <div className="noti">
                <div className="count">3</div>
              </div>
            </a>
            <div className="dropdown-menu">
              <div className="info d-flex align-items-center">
                <div className="content">
                  <div className="item">
                    <div className="title text-ellipsis">Thông báo thông báo thông báoaaaaaaaaaaaaaaa dsadasdasdasdasdsadsa</div>
                    <div className="sub-title text-ellipsis">phiếu đang đang sửa rồi nhé ádsadasdasdsadasdW</div>
                  </div>
                  <div className="item">
                    <div className="title">Thông báo thông báo thông báo</div>
                    <div className="sub-title">phiếu đang đang sửa rồi nhé</div>
                  </div>
                  <div className="item">
                    <div className="title">Thông báo thông báo thông báo</div>
                    <div className="sub-title">phiếu đang đang sửa rồi nhé</div>
                  </div>
                  <div className="item">
                    <div className="title">Thông báo thông báo thông báo</div>
                    <div className="sub-title">phiếu đang đang sửa rồi nhé</div>
                  </div>
                  <div className="item">
                    <div className="title">Thông báo thông báo thông báo</div>
                    <div className="sub-title">phiếu đang đang sửa rồi nhé</div>
                  </div>
                  <div className="item">
                    <div className="title">Thông báo thông báo thông báo</div>
                    <div className="sub-title">phiếu đang đang sửa rồi nhé</div>
                  </div>
                  <div className="item">
                    <div className="title">Thông báo thông báo thông báo</div>
                    <div className="sub-title">phiếu đang đang sửa rồi nhé</div>
                  </div>
                  <div className="item">
                    <div className="title">Thông báo thông báo thông báo</div>
                    <div className="sub-title">phiếu đang đang sửa rồi nhé</div>
                  </div>
                  <div className="item">
                    <div className="title">Thông báo thông báo thông báo</div>
                    <div className="sub-title">phiếu đang đang sửa rồi nhé</div>
                  </div>
                </div>
              </div>

            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  changeShowFeedBack: (show) => dispatch(changeShowFeedBack(show)),
});
export default withRouter(connect(null, mapDispatchToProps)(TopBar));
