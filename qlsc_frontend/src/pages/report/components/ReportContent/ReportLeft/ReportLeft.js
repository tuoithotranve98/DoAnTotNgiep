import React, { useState, useEffect } from "react";

import ChartRevenueDashboard from "./ChartRevenueDashboard";
import "./styles.scss";

function ReportLeft(props) {
  const { data, fetching } = props;
  const [dataState, setDataState] = useState();

  useEffect(() => {
    if (data && data.totalMonies) {
      setDataState(data.totalMonies);
    }
  }, [data]);

  const isLoading = false;
  console.log('dataState', dataState);
  return (
    <div className="report-revenue-component report-border ">
      <div className="report-title">Doanh thu cửa hàng</div>
      <div className="content">
        <ChartRevenueDashboard revenue={dataState} />
      </div>
    </div>
  );
}

export default React.memo(ReportLeft);
