/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import StaffInfo from './StaffInfo/StaffInfo';
import './styles.scss';
function StaffCreate(props) {
  const {  } = props;
  useEffect(() => {
  }, []);
  return (
    <div className="staff-screen-wrapper-create">
      <div className="col-md-8">
        <StaffInfo />
      </div>
      <div className="col-md-4"></div>
    </div>
  );
}
StaffCreate.defaultProps = {

};

export default React.memo(connect(null, null)(StaffCreate));
