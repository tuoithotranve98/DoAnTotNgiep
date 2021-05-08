import React from "react";
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
    <div className="customer-detail-info">
      <div className="card">
        <div className="label">Thông tin nhân viên</div>
        <div className="content">
          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Mã nhân viên</div>
                <div className="content-value">
                  {(staff && staff.code) || ''}
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Tên nhân viên</div>
                <div className="content-value">{(staff && staff.name) || ''}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Email</div>
                <div className="content-value">{(staff && staff.email) || ''}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Địa chỉ</div>
                <div className="content-value">{(staff && staff.address) || ''}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Số điện thoại</div>
                <div className="content-value">{(staff && staff.phone) || ''}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Số điện thoại</div>
                <div className="content-value">{(staff && staff.phone) || ''}</div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Nhân viên</div>
                <div className="content-value">{handleTextRole()}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Tổng số phiếu</div>
                <div className="content-value">{(staff && staff.totalMaintenanceCard) || 0}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="d-flex item">
                <div className="label">Tổng số phiếu</div>
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
