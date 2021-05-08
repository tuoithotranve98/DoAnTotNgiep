import React, { useState } from 'react';
import ReportLeft from './ReportLeft/ReportLeft';
import ReportRight from './ReportRight/ReportRight';
import './styles.scss';

function ReportConent() {
  return (
    <div className="report-content-container">
        <div className="row report-general-order-container">
            <div className="col-md-7" style={{ paddingRight: 0 }}>
                <ReportLeft />
            </div>
            <div className="col-md-5">
                <ReportRight />
            </div>
        </div>
    </div>
  );
}

export default ReportConent;
