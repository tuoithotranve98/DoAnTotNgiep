import React from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { staff_role } from "../../../commons/staffConstants";
import "./styles.scss";
function StaffDetailInfo(props) {
  const { staff } = props;

  const handleTextRole = () => {
    if (staff && staff.role) {
      const role = staff_role.find((role) => role.id === staff.role);
      if (role) return role.name;
    }
    return 'Chủ cửa hàng';
  }

  return (
    <div className="staff-detail-info">
      <div className="card">
        <div className="d-flex title-content">
          <div className="title">Thông tin nhân viên</div>
          <div className="action-diff">
            {/* <span className="text">Thao tác khác</span>
            <Icons.dropdownIcon /> */}
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="btn-action-diff">
             Thao tác khác
            </Dropdown.Toggle>

            <Dropdown.Menu>

              <Dropdown.Item onClick={() => { pushstate(history, `/staff/update/${customer.id}`); }}>Cập nhật thông tin</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-2">Xóa nhân viên</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã nhân viên: &nbsp;</div>
                <div className="content-value">
                  {(staff && staff.code) || '---'}
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Tên nhân viên:&nbsp;</div>
                <div className="content-value">{(staff && staff.name) || '---'}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Email:&nbsp;</div>
                <div className="content-value">{(staff && staff.email) || '---'}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Địa chỉ:&nbsp;</div>
                <div className="content-value">{(staff && staff.address) || '---'}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Số điện thoại:&nbsp;</div>
                <div className="content-value">{(staff && staff.phone) || '---'}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Số điện thoại:&nbsp;</div>
                <div className="content-value">{(staff && staff.phone) || '---'}</div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Nhân viên:&nbsp;</div>
                <div className="content-value">{handleTextRole()}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Tổng số phiếu:&nbsp;</div>
                <div className="content-value">{(staff && staff.totalMaintenanceCard) || 0}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Tổng số phiếu:&nbsp;</div>
                <div className="content-value">{(staff && staff.totalMaintenanceCard) || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
StaffDetailInfo.defaultProps = {};

export default React.memo(connect(null, null)(StaffDetailInfo));
