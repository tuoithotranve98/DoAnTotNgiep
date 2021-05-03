/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import StaffInfo from './StaffInfo/StaffInfo';
import './styles.scss';
function StaffCreate(props) {
  const {  } = props;
  const [user, setUser] = useState({
    name: null,
    code: null,
    phone: null,
    email: null,
    address: null,
    city: null,
    ward: null,
    description: null
  })
  useEffect(() => {
  }, []);
  return (
    <div className="staff-screen-wrapper-create">
      <div className="col-md-8">
        <StaffInfo user={user} />
      </div>
      <div className="col-md-4"></div>
    </div>
  );
}
StaffCreate.defaultProps = {

};

export default React.memo(connect(null, null)(StaffCreate));
