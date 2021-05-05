/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
function StaffLogin(props) {
  const {  } = props;
  useEffect(() => {
  }, []);
  return (
    <div className="staff-login-create">
      <div className="page-info">
        <div className="col-12 field p-0">
          <div className="label mb-2 label-required">Tên khách hàng</div>
          <input
            className="customer-name"
            type="text"
            name="name"
            // onChange={(e) => this.onChangeName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
StaffLogin.defaultProps = {

};

export default React.memo(connect(null, null)(StaffLogin));
