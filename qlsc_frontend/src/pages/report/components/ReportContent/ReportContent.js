import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReportLeft from "./ReportLeft/ReportLeft";
import ReportRight from "./ReportRight/ReportRight";
import { getDataForReport } from "../../actions/reportAction";
import "./styles.scss";
import LineLeft from "./components/LineLeft";
import LineRight from "./components/LineRight";

function ReportConent(props) {
  const { onGetDataForReport } = props;
  const [data, setData] = useState({});

  useEffect(() => {
    onGetDataForReport().then((json) => {
      if (json) setData(json);
    });
  }, []);
  return (
    <div className="report-content-container">
      <div className="row report-general-order-container">
        <div className="col-md-7" style={{ paddingRight: 0 }}>
          <ReportLeft data={data} />
        </div>
        <div className="col-md-5">
          <ReportRight />
        </div>
      </div>

      <div
        className="row report-general-order-container"
        style={{ paddingTop: 15 }}
      >
        <div className="col-md-7" style={{ paddingRight: 0 }}>
          <LineLeft />
        </div>
        <div className="col-md-5">
          <LineRight />
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onGetDataForReport: (from, to) => dispatch(getDataForReport(from, to)),
});

export default connect(null, mapDispatchToProps)(ReportConent);
