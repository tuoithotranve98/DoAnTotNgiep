/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { convertSecondToDate } from 'utils/datetimeUtil';
import { openModal } from '../../../../../components/modal/modalActions';
import "./styles.scss";
import { Dropdown } from "react-bootstrap";
import pushstate from "../../../../../utils/pushstate";
import { useHistory, withRouter } from "react-router";
import { toLocaleDateString } from "../../../../../utils/datetimeUtil";
function CustomerDetailInfo(props) {
  const { customer, onOpenModalDelete } = props;
  const history = useHistory();
  const formatAddress = () => {
    const { ward } = customer;
    let txtAddress = '';
    if (ward) {
      txtAddress += ward.text;
    }
    if (ward && ward.district) {
      txtAddress += ward.district.text;
    }
    return txtAddress;
  }
  const handleDeleteCustomer = () => {
    onOpenModalDelete("deleteCustomer", { customer });
  }
  const dateTime = customer && customer.createdDate ? toLocaleDateString(customer.createdDate) : '---';
  return (
    <div className="customer-detail-info">
      <div className="card">
        <div className="d-flex title-content">
          <div className="title">Thông tin khách hàng</div>
          <div className="action-diff">
            {/* <span className="text">Thao tác khác</span>
            <Icons.dropdownIcon /> */}
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="btn-action-diff">
             Thao tác khác
            </Dropdown.Toggle>

            <Dropdown.Menu>

              <Dropdown.Item onClick={() => { pushstate(history, `/customer/update/${customer.id}`); }}>Cập nhật thông tin</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => handleDeleteCustomer()}>Xóa khách hàng</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã khách hàng: &nbsp; </div>
                <div className="content-value">{(customer && customer.code) || '---'}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Ngày tạo: &nbsp; </div>
                <div className="content-value">{dateTime}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Email: &nbsp; </div>
                <div className="content-value">{(customer && customer.email) || '---'}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Tên khách hàng: &nbsp; </div>
                <div className="content-value">{(customer && customer.name) || '---'}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Ngày sửa:  &nbsp; </div>
                <div className="content-value">{(customer && customer.modifiedDate) ? toLocaleDateString(customer.modifiedDate) : '---'}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Địa chỉ: &nbsp; </div>
                <div className="content-value">{formatAddress() || '---'}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Số điện thoại: &nbsp; </div>
                <div className="content-value">{(customer && customer.phone) || '---'}</div>
              </div>
            </div>
            <div className="col-4">

            </div>
            <div className="col-4">
              <div className="d-flex item">
              <div className="label">Mô tả: &nbsp; </div>
                <div className="content-value">{(customer && customer.description) || '---'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
CustomerDetailInfo.defaultProps = {};

const mapDispatchToProps = (dispatch) => ({
  onOpenModalDelete: (modalName, data) => dispatch(openModal(modalName, data)),
});

export default withRouter(React.memo(connect(null, mapDispatchToProps)(CustomerDetailInfo)));
