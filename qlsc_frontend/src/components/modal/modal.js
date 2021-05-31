import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as _ from 'lodash'
// styles
import './modal.scss'
import { resetModal } from './modalActions'
import DeleteModal from '../../pages/customer/components/CustomerDetail/Modal/DeleteModal'
import DeleteModalStaff from '../../pages/staff/components/StaffDetail/Modal/DeleteModal';
import DeleteModalProduct from '../../pages/product/components/ProductUpdate/Modal/DeleteModal';
import ProgressBar from '../../progressbar/ProgressBar';
import DeleteMaintenanCard from '../../pages/maintenancecard/components/MainCardCreate/Modal/DeleteModal';
// import CreateProductModal from '../../pages/product/list/CreateProductModal'

function Modals (props) {
  const { history } = props
  const url = history.location.pathname

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsidePopup)
    document.addEventListener('keydown', escFunction, false)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsidePopup)
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [])

  useEffect(() => {
    props.resetModal()
  }, [url])

  const escFunction = (event) => {
    if (event.keyCode === 27) {
      if (
        $('.background_body') &&
        $('.background_body').length === 1
      ) {
        props.resetModal()
      }
    }
  }

  const handleClickOutsidePopup = event => {
    if (
      event &&
      event.target &&
      event.target.className &&
      typeof event.target.className === 'string' &&
      event.target.className.includes('background_body')
    ) {
      props.resetModal()
    }
  }

  // NOTE:
  // nếu muốn click ra ngoài, phím tắt ESC đóng popup dùng cái nè
  // .background_body,
  // nếu muốn click ra ngoài, phím tắt ESC không đóng popup dùng cái nè
  // .background_disable_close_click_outside

  const { modal } = props
  return (
    <div className="modal_container">
      { modal.createProductModal.show ? (<CreateProductModal />) : null }
      { modal.deleteCustomer.show ? <DeleteModal /> : null }
      { modal.deleteStaffModal.show ? <DeleteModalStaff /> : null }
      { modal.deleteProductModal.show ? <DeleteModalProduct /> : null }
      { modal.progressBar.show ? <ProgressBar /> : null }
      { modal.deleteMaintenanCardModal. show ? <DeleteMaintenanCard /> : null}
    </div>
  )
}
const mapStateToProps = ({ modal }) => {
  return {
    modal
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    { resetModal }
  )(Modals))
