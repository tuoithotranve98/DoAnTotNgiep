import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import pushstate from "utils/pushstate";
import debounce from "utils/debounce";
import { changeShowFeedBack } from "../../actions/globalUiActions";
import * as Icons from "./Icons";
import { convertSecondToDateV1 } from "../../utils/datetimeUtil";
import {
  getMessages,
  markRead,
  removeMessage,
} from "../../actions/notificationAction";
import "./styles.scss";
import history from "../../utils/history";

function TopBar(props) {
  const { totalItems, messages, currentPage, totalPages } = props.notification;
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

  const countNoti = () => {
    return totalItems;
  };

  const debounceScroll = debounce((e) => {
    onScroll(e, false);
  }, 500);

  const onScroll = (e) => {
    const height =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
    if (height <= 500 && currentPage < totalPages) {
      props.onGetMessages(currentPage + 1);
    }
  };

  const onReadMessage = (message) => {
    history.push(message.url);
    if (message.unRead) {
      props.onMarkRead(message.id);
    }
  };

  const onRemoveMessage = (id, e) => {
    e.stopPropagation();
    props.onRemoveMessage(id);
  };

  return (
    <div className="d-flex top-bar-market-place">
      <div className="top-bar-text">{getTopBarText()}</div>
      <div className="d-flex top-bar-action">
        {/* <div
          className="icon-feed-back"
          onClick={() => props.changeShowFeedBack(true)}
        >
          <Icons.iconFeedback />
          <span>Góp ý</span>
        </div> */}
        <ul className="nav menu-bottom">
          <li className="user">
            <a href="#" data-toggle="dropdown">
              <Icons.iconUpdate />
              <span>Thông báo</span>
              {countNoti() > 0 ? (
                <div className="noti">
                  <div className="count">{countNoti() || 0}</div>
                </div>
              ) : null}
            </a>
            <div className="dropdown-menu">
              <div className="info align-items-center">
                <div className="header">
                  <div className="title">Thông báo</div>
                </div>
                <div
                  className="content"
                  onScroll={(e) => {
                    e.persist();
                    e.stopPropagation();
                    debounceScroll(e);
                  }}
                >
                  {messages &&
                    messages.length &&
                    messages.map((message) => {
                      return (
                        <div
                          className="d-flex item"
                          style={message.unRead ? { background: "rgb(242, 249, 255)" } : { background: "rgb(241 241 241)"}}
                          key={message.id}
                        >
                          <div className="icon">
                            {!message.unRead ? (
                              <Icons.IconNewsV2 />
                            ) : (
                              <Icons.IconNews />
                            )}
                          </div>
                          <div
                            className="content-noti"
                            onClick={() => onReadMessage(message)}
                          >
                            <div
                              className="title"
                              style={!message.unRead ? { fontWeight: 400 } : {}}
                            >
                              {message.title || ""}
                            </div>
                            <div className="sub-title">
                              {message.content || ""}
                            </div>
                            <div
                              className="remove"
                              onMouseDown={(e) =>
                                onRemoveMessage(message.id, e)
                              }
                            >
                              <span>x</span>
                            </div>
                            <div className="date">
                              {convertSecondToDateV1(message.createdDate)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { notification } = state;
  return {
    notification,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeShowFeedBack: (show) => dispatch(changeShowFeedBack(show)),
  onGetMessages: (page) => dispatch(getMessages(5, page)),
  onMarkRead: (id) => dispatch(markRead(id)),
  onRemoveMessage: (id) => dispatch(removeMessage(id)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));
