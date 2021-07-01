import React, { useState, useEffect } from "react";
import Filter from "./Filter/Filter";
import { connect } from "react-redux";
import {
  getDataForReport,
  getDataForMainReport,
  getDataForAccessoriesReport,
  getDataForStaffReport,
} from "../actions/reportAction";
import "./styles.scss";
import TabReport from "./TabReport/TabReport";
import ReportContent from "./ReportContent/ReportContent";
import MainReport from "./MainReport/MainReport";
import AccessoriesReport from "./AccessoriesReport/AccessoriesReport";
import StaffReport from "./StaffReport/StaffReport";

function ReportMain(props) {
  const {
    onGetDataForReport,
    onGetDataForMainReport,
    onGetDataForAccessoriesReport,
    onGetDataForStaffReport,
  } = props;
  const [tab, setTab] = useState(1);
  const [data, setData] = useState([]);
  const [dataMain, setDataMain] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [dataStaff, setDataStaff] = useState([]);
  const [time, setTime] = useState({});

  useEffect(() => {
    if (time.from && time.to) {
      onGetMainReportByFilter(time.from, time.to);
      onGetAccessoriesReportByFilter(time.from, time.to);
      onGetStaffReportByFilter(time.from, time.to);
    }
  }, []);

  useEffect(() => {
    if (time.from && time.to && tab === 1) {
      onGetDataByFilter(time.from, time.to);
    } else if (time.from && time.to && tab === 2) {
      onGetMainReportByFilter(time.from, time.to);
    } else if (time.from && time.to && tab === 3) {
      onGetAccessoriesReportByFilter(time.from, time.to);
    } else if (time.from && time.to && tab === 4) {
      onGetStaffReportByFilter(time.from, time.to);
    }
  }, [time, tab]);

  const onChangeTime = (from, to) => {
    setTime({ from: from, to: to });
  };

  const onGetStaffReportByFilter = (from, to) => {
    onGetDataForStaffReport(from, to).then((json) => {
      if (json) setDataStaff(json);
    });
  };

  const onGetAccessoriesReportByFilter = (from, to) => {
    onGetDataForAccessoriesReport(from, to).then((json) => {
      if (json) setAccessories(json);
    });
  };

  const onGetMainReportByFilter = (from, to) => {
    onGetDataForMainReport(from, to).then((json) => {
      if (json) setDataMain(json);
    });
  };

  const onGetDataByFilter = (from, to) => {
    onGetDataForReport(from, to).then((json) => {
      if (json) setData(json);
    });
  };

  const onChangeTab = (id) => {
    setTab(id);
  };

  return (
    <div className="report-main-container">
      <TabReport tab={tab} onChangeTab={onChangeTab} />
      <Filter
        onChangeTime={onChangeTime}
        tab={tab}
        dataMain={dataMain}
        dataStaff={dataStaff}
        accessories={accessories}
      />
      {tab === 1 ? <ReportContent data={data} /> : null}
      {tab === 2 ? <MainReport dataMain={dataMain} isMain /> : null}
      {tab === 3 ? (
        <AccessoriesReport accessories={accessories} isAccessories />
      ) : null}
      {tab === 4 ? <StaffReport dataStaff={dataStaff} /> : null}
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  onGetDataForReport: (from, to) => dispatch(getDataForReport(from, to)),
  onGetDataForMainReport: (from, to) =>
    dispatch(getDataForMainReport(from, to)),
  onGetDataForAccessoriesReport: (from, to) =>
    dispatch(getDataForAccessoriesReport(from, to)),
  onGetDataForStaffReport: (from, to) =>
    dispatch(getDataForStaffReport(from, to)),
});
export default connect(null, mapDispatchToProps)(ReportMain);
