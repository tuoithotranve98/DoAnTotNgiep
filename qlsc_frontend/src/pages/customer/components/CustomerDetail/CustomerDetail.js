/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CustomerDetailInfo from './CustomerDetailInfo/CustomerDetailInfo';
import HistoryMainCard from './HistoryMainCard/HistoryMainCard';
import './styles.scss';
function CustomerDetail(props) {
  const {  } = props;
  useEffect(() => {
  }, []);
  return (
    <div className="customer-screen-wrapper-detail">
        <CustomerDetailInfo />
        <HistoryMainCard />
    </div>
  );
}
CustomerDetail.defaultProps = {

};

export default React.memo(connect(null, null)(CustomerDetail));
