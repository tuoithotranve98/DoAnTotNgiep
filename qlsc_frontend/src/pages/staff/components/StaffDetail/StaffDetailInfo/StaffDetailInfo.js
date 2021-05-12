import React from "react";
import { withRouter } from "react-router";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { staff_role } from "../../../commons/staffConstants";
import pushstate from "utils/pushstate";
import { openModal } from '../../../../../components/modal/modalActions';
import "./styles.scss";
function StaffDetailInfo(props) {
  const { staff, onOpenModalDelete } = props;

  const handleTextRole = () => {
    if (staff && staff.role) {
      const role = staff_role.find((role) => role.id === staff.role);
      if (role) return role.name;
    }
    return 'Chủ cửa hàng';
  }

  const handleDeleteStaff = () => {
    onOpenModalDelete("deleteStaffModal", { staff: staff});
  }

  return (
    <div className="staff-detail-info">
      <div className="card">
        <div className="d-flex title-content">
          <div className="title">Thông tin nhân viên</div>
          <div className="action-diff">
            <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="btn-action-diff">
             Thao tác khác
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { pushstate(props.history, `/staff/update/${staff.id}`); }}>Cập nhật thông tin</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => handleDeleteStaff()}>Xóa nhân viên</Dropdown.Item>
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
const mapDispatchToProps = (dispatch) => ({
  onOpenModalDelete: (modalName, data) => dispatch(openModal(modalName, data)),
});
export default withRouter(React.memo(connect(null, mapDispatchToProps)(StaffDetailInfo)));
