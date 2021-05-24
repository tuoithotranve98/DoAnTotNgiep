import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as Icons from "common/icons";
import "./sideBar.scss";
import SubMenu from "./submenu/SubMenu";
import { changeShowMenuTopBar } from "../../actions/globalUiActions";
import { logout } from "../../pages/login/actions/loginAction";
import { menuLinkFull } from "utils/router.js";
import pushstate from "../../utils/pushstate";

function SideBar(props) {
  const { showMenu, setShowMenu, changeShowMenuTopBar, user, onLogout } = props;
  const [init, setInit] = useState({
    menu: 99,
    submenu: "",
  });
  useEffect(() => {
    const url = props.history.location.pathname;
    const item = menuLinkFull.find((a) => {
      if (a.url.length > 1) {
        if (url.includes(a.url)) {
          return a;
        }
        return "";
      }
    });
    if (item) {
      const subItem =
        item.submenu.length > 0 ? item.submenu.find((a) => a.url === url) : "";
      if (subItem) {
        setInit({ ...init, menu: item.id, submenu: subItem.id });
      }
    }
  }, []);

  const onClickMoreIcon = () => {
   setTimeout(() => {
    setShowMenu(!showMenu);
   }, 50);
  };

  const handleLogout = () => {
    onLogout();
    pushstate(props.history, "/login");
  }

  const onSetInit = (a, b) => {
    if (a === init.menu) {
      setInit({ ...init, menu: "", submenu: b });
    } else {
      setInit({ ...init, menu: a, submenu: b });
    }
  };
  return (
    <div className={`aside ${showMenu ? "col-left" : ""}`}>
      <div className="ekko-menu-top-header">
        {!showMenu ? <div className="logo">Quản lý sửa chữa</div> : ""}
        <a
          className="more-icons"
          onClick={() => {
            onClickMoreIcon();
          }}
        >
          <Icons.moreIcon />
        </a>
      </div>
      <SubMenu onSetInit={onSetInit} init={init} showMenu={showMenu}></SubMenu>
      <ul className="nav menu-bottom">
        <li className="user">
          <a href="#" data-toggle="dropdown">
            <img
              src="https://steamuserimages-a.akamaihd.net/ugc/772858922483239101/AF7361F63549870B02CCEDDEE8C3E70FB90C56D5/"
              alt="avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/avatar-default.png";
              }}
            />
            <span>{(user && user.name) || 'Nhân viên'}</span>
          </a>
          <div className="dropdown-menu">
            <div className="info d-flex align-items-center">
              <div className="avatar">
                <img src="https://steamuserimages-a.akamaihd.net/ugc/772858922483239101/AF7361F63549870B02CCEDDEE8C3E70FB90C56D5/" />
                <span className="status active" />
              </div>
              <div>
                <p>{(user && user.name) || 'Nhân viên'}</p>
                <span className="status active">Đang hoạt động</span>
              </div>
            </div>
            <ul>
              <li>
                <a onClick={() => handleLogout()}>Đăng xuất</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
SideBar.defaultProps = {
  showMenu: "",
  changeShowMenuTopBar: () => {},
};
const mapStateToProps = (state) => {
  const {
    globalUI: { showMenuTopBar },
    auth: { user },
  } = state;
  const showMenu = showMenuTopBar;
  return {
    user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  changeShowMenuTopBar: () => dispatch(changeShowMenuTopBar()),
  onLogout: () => dispatch(logout()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SideBar)
);
