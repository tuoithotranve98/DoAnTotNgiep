/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as Icons from "common/icons";
import "./sideBar.scss";
import SubMenu from "./submenu/SubMenu";
import { changeShowMenuTopBar } from "../../actions/globalUiActions";
import { menuLinkFull } from "utils/router.js";

function SideBar(props) {
  // eslint-disable-next-line react/prop-types
  const url = props.history.location.pathname;
  const { showMenu, changeShowMenuTopBar } = props;
  const [init, setInit] = useState({
    menu: 99,
    submenu: "",
  });
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const url = props.history.location.pathname;
    const item = menuLinkFull.find((a) => {
      if (a.url.length > 1) {
        const temp = a.url.substring(0, a.url.length - 1);
        if (url.includes(temp)) {
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
    changeShowMenuTopBar(!showMenu);
  };

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
        {!showMenu ? <div className="logo">My Ekko</div> : ""}
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
        <li className={url === "/setting/manage-page" ? "active" : ""}>
          <Link to="/setting/manage-page">
            <Icons.SettingIcon />
            <span>Cấu hình</span>
          </Link>
        </li>
        <li className={url === "/newfeatures" ? "active" : ""}>
          <Link to="/newfeatures">
            <Icons.UpdateIcon />
            <span>Cập nhật mới</span>
          </Link>
        </li>
        <li className="user">
          <a href="#" data-toggle="dropdown">
            <img
              src="https://steamuserimages-a.akamaihd.net/ugc/772858922483239101/AF7361F63549870B02CCEDDEE8C3E70FB90C56D5/"
              alt="zzz"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/avatar-default.png";
              }}
            />
            <span>Nguyễn Thọ</span>
          </a>
          <div className="dropdown-menu">
            <div className="info d-flex align-items-center">
              <div className="avatar">
                <img src="./../../images/ekko.jpg" />
                <span className="status active" />
              </div>
              <div>
                <p>Nguyễn Thọ</p>
                <span className="status active">Đang hoạt động</span>
              </div>
            </div>
            <ul>
              <li>
                <a
                  href="#"
                  onClick={() =>
                    window.open("https://support.sapo.vn/sapo-social")
                  }
                >
                  Hướng dẫn sử dụng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => window.open("https://support.sapo.vn/")}
                >
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#">Đăng xuất</a>
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
  } = state;
  const showMenu = showMenuTopBar;
  return {
    showMenu,
  };
};
const mapDispatchToProps = (dispatch) => ({
  changeShowMenuTopBar: () => dispatch(changeShowMenuTopBar()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SideBar)
);
