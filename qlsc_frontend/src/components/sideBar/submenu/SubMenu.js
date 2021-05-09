/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as Icons from 'common/icons';
import { menuLinkFull, menuLinkCoordinator } from 'utils/router.js';
import './submenu.scss'

function SubMenu (props) {
  const url = props.history.location.pathname;
  const [menuLink, setMenuLink] = useState([]);
  const {
    onSetInit,
    init,
    showMenu,
    user,
  } = props

  useEffect(() => {
    setMenuLink(menuLinkFull || []);
  }, [])

  useEffect(() => {
    if (user && user.role === 1) {
      setMenuLink(menuLinkCoordinator);
    }
  }, [user])
  console.log("menuLink", menuLink);
  console.log("init", init);
  console.log("url", url);
  return (
    <React.Fragment>
      {
        menuLink.map((item, key) => {
          return (
            <ul className='nav menu-top' key={key}>
              <li className={`${url === item.url ? 'item active' : 'item'} ${item.submenu.length > 0 && init.menu === item.id ? 'active-show' : ''}`}>
                <Link to={`${item.submenu.length === 0 ? item.url : '#'}`} onClick={() => onSetInit(item.id, '')} className="link">
                  {item.icon}
                  <span>{ !showMenu ? item.title : ''}</span>
                </Link>
                {
                  item.submenu.length > 0 && !showMenu && init.menu === item.id ? (
                    <ul className="sub-menu">
                      {
                        item.submenu.map((a, index) => {
                          return (
                            <Link to={`${a.url}`} className={`${url === a.url ? 'sub-item active' : 'sub-item'}`} key={index}>
                              {a.title}
                            </Link>
                          )
                        })
                      }
                    </ul>
                  ) : ''
                }
              </li>
            </ul>
          )
        })
      }
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  const { auth } = state;
  const user = auth.user;
  return {
    user,
  };
};

export default withRouter(connect(mapStateToProps, null)(SubMenu))
