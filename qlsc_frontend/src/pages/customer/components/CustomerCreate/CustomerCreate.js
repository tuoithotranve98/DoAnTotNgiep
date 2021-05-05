/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import InfoCustomerLeft from './InfoCustomerLeft/InfoCustomerLeft';
import InfoCustomerRight from './InfoCustomerRight/InfoCustomerRight';
import './styles.scss';
function CustomerCreate(props) {
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
    <div className="customer-screen-wrapper-create">
      <div className="row">
        <div className="col-md-8">
            <InfoCustomerLeft />
        </div>
        <div className="col-md-4">
            <InfoCustomerRight />
        </div>
      </div>
    </div>
  );
}
CustomerCreate.defaultProps = {

};

export default React.memo(connect(null, null)(CustomerCreate));
