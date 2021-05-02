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

    </div>
  );
}
StaffLogin.defaultProps = {

};

export default React.memo(connect(null, null)(StaffLogin));
