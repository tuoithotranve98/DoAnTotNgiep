/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TopBarStaff from './TopBarStaff'
import TopBarMaintenancecard from './TopBarMaintenancecard'
import TopBarCustomer from './TopBarCustomer'
import TopBarReport from './TopBarReport'
import TopBarProduct from './TopBarProduct'
import './topBar.scss'
// import DropdownMenu from './DropdownMenu/DropdownMenu';

function PagePanel (props) {
  // eslint-disable-next-line react/prop-types
  const url = props.history.location.pathname
  const { showMenu } = props
  const [isShowPopup, setIsShowPopup] = useState(false)
  const popupAvatar = useRef()
  // const styleTopBar = { width: 'calc(100% - 200px)' }
  const styleDisplayUser = { cursor: 'pointer' }
  const styleDisplaySupport = {}

  const handleClickOutside = (event) => {
    if (popupAvatar && !popupAvatar.contains(event.target) && isShowPopup) {
      setIsShowPopup(true)
    }
  }

  const togglePopup = () => {
    setIsShowPopup(!isShowPopup)
  }

  return (
    <div className={`top-bar d-flex justify-content-between align-items-center top-bar-body ${showMenu ? 'top-bar-active' : ''} `}>
      <div
        className='top-bar_list d-flex align-items-center'
        // style={styleTopBar}
      >
        {url && url.includes('/maintenance-card') ? <TopBarMaintenancecard /> : null}
        {url && url.includes('/customer') ? <TopBarCustomer /> : null}
        {url && url.includes('/product') ? <TopBarProduct /> : null}
        {url && url.includes('/staff') ? <TopBarStaff /> : null}
        {url && url.includes('/report') ? <TopBarReport /> : null}
      </div>
      <div className='user' style={styleDisplaySupport}>
        <a
          className='button-support'
          title='Trợ giúp'
          href='#'
          style={{ color: 'black' }}
          data-toggle='dropdown'
        >
          <i className='fa fa-2x fa-question-circle-o' aria-hidden='true' />
          <span>Trợ giúp</span>
        </a>
        <div
          className='dropdown-menu dropdown-support'
          style={{
            width: 400,
            height: 417
          }}
        >
          <iframe
            title='support'
            style={{
              width: 400,
              height: 417,
              border: 'none'
            }}
          />
        </div>
      </div>
      <div
        className='user user-avatar-for-tooltip'
        style={styleDisplayUser}
        ref={popupAvatar}
      >
        <a>
          <img
            src='https://steamuserimages-a.akamaihd.net/ugc/772858922483239101/AF7361F63549870B02CCEDDEE8C3E70FB90C56D5/'
            alt=''
          />
          <span className={`status ${true ? 'active' : 'inactive'}`} />
        </a>
        {/* {isShowPopup && (
        <DropdownMenu
          auth={this.props.auth}
          status={status}
          logout={logout}
          history={history}
          onClick={this.onClick}
          currentUrl={url}
          togglePopup={this.togglePopup}
        />
      )} */}
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  const {
    globalUI: { showMenuTopBar }
  } = state
  const showMenu = showMenuTopBar
  return {
    showMenu
  }
}
export default withRouter(connect(mapStateToProps, null)(PagePanel))
