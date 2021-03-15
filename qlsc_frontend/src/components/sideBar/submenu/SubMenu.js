import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import * as Icons from 'common/icons'
import { menuLink } from 'utils/router.js'
import './submenu.scss'

function SubMenu (props) {
  // eslint-disable-next-line react/prop-types
  const url = props.history.location.pathname
  const {
    onSetInit,
    init,
    showMenu
  } = props

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
export default withRouter(connect(null, null)(SubMenu))
