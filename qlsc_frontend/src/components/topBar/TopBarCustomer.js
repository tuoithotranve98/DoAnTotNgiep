import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function TopbarCustomer (props) {
  const onRedirect = () => {
    // pushstate(props.history, '/manage-staff')
  }
  const url = props.location ? props.location.pathname : ''
  if (url.includes('edit')) {
    return (
      <div className="wrapper-customer-topbar">
        <div className="current">
          <span>Cập nhật thông tin khách hàng</span>
        </div>
      </div>
    )
  }
  if (url.includes('customer', 'info')) {
    return (
      <div className="wrapper-customer-topbar">
        <div className="current">
          <span>Thông tin khách hàng</span>
        </div>
      </div>
    )
  }
  if (url.includes('customer/create')) {
    return (
      <div className="wrapper-customer-topbar">
        <div className="current">
          <span>Thêm mới khách hàng</span>
        </div>
      </div>
    )
  }
  if (url.includes('customer/detail')) {
    return (
      <div className="wrapper-customer-topbar">
        <h1>
          <a onClick={() => onRedirect()} style={{ cursor: 'pointer' }}>
            <span>
              Danh sách khách hàng
            </span>
          </a>
        </h1>
        <div className="current">
          <span>Chi tiết khách hàng</span>
        </div>
      </div>
    )
  }
  return (
    <div className="wrapper-customer-topbar">
      Danh sách khách hàng
    </div>
  )
}

export default withRouter(connect(null, null)(TopbarCustomer))
