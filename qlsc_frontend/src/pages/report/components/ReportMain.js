import React, { useState } from 'react';
import Filter from './Filter/Filter';
import './styles.scss';

function ReportMain() {
  return (
    <div className="report-main-container">
      <Filter />
      {/* <ReportContent /> */}
    </div>
  );
}

export default ReportMain;
