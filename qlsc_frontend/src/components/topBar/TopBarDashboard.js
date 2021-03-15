import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function TopBarDashboard (props) {
  // eslint-disable-next-line react/prop-types
  const url = props.location ? props.location.pathname : ''
  if (url.includes('/dashboard')) {
    return (
      <div className="wrapper-dashboard-topbar">
        Tổng quan
      </div>
    )
  }
}

export default withRouter(connect(null, null)(TopBarDashboard))
