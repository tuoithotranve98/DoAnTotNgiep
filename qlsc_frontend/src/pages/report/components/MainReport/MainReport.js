import React from "react";
import "./styles.scss";
import ChartRevenueDashboard from "../ReportContent/ReportLeft/ChartRevenueDashboard";
import { moneyFormat } from "../../../../utils/moneyFormat";

const dataFake = [
  { time: "23/05", total: 0, dateText: "23/05/2021" },
  { time: "24/05", total: 0, dateText: "24/05/2021" },
  { time: "25/05", total: 0, dateText: "25/05/2021" },
  { time: "26/05", total: 0, dateText: "26/05/2021" },
  { time: "27/05/2021", total: 17, dateText: null },
  { time: "28/05", total: 0, dateText: "28/05/2021" },
  { time: "29/05/2021", total: 10, dateText: null },
];

function MainReport(props) {
  const { dataMain } = props;

  const totalMain = () => {
    let total = 0;
    dataMain.forEach((item) => total += item.totalMc);
    return total;
  };

  const totalSuccess = () => {
    let total = 0;
    dataMain.forEach((item) => total += item.success);
    return total;
  };

  const totalUnfinished = () => {
    let total = 0;
    dataMain.forEach((item) => total += item.unfinished);
    return total;
  };
  const totalRevenue = () => {
    let total = 0;
    dataMain.forEach((item) => total += item.revenue);
    return total;
  };
  return (
    <div className="report-content-container">
      <div className="revenue-role-main-chart">
        <div className="revenue-main report-border">
          <div className="report-title">Doanh thu phiếu sửa chữa</div>
          <ChartRevenueDashboard revenue={dataMain} isMain />
        </div>
      </div>
      <div className="interactive-role-main-table">
        <div className="table-interactive-main-staff">
          <div className="report-table">
            {/* header */}
            <div className="report-table-header  d-flex">
              <div className="tbl-header" style={{ width: "15%" }}>
                Thời gian
              </div>
              <div
                className="tbl-header"
                style={{ width: "15%", textAlign: "right" }}
              >
                Tổng số phiếu
              </div>
              <div
                className="tbl-header"
                style={{ width: "25%", textAlign: "right" }}
              >
                Số phiếu hoàn thành
              </div>
              <div
                className="tbl-header"
                style={{ width: "27%", textAlign: "right" }}
              >
                Số phiếu chưa hoàn thành
              </div>
              <div
                className="tbl-header"
                style={{ width: "18%", textAlign: "right", paddingRight: 15 }}
              >
                Doanh thu
              </div>
            </div>
            {/* header */}
            {/* total */}
            <div className="report-table-total">
              <div className="tbl-item d-flex">
                <div className="tbl-col" style={{ width: "15%" }}>
                  Tổng
                </div>
                <div
                  className="tbl-col"
                  style={{ width: "15%", textAlign: "right" }}
                >
                  {totalMain()} phiếu
                </div>
                <div
                  className="tbl-col"
                  style={{ width: "25%", textAlign: "right" }}
                >
                  {totalSuccess()} phiếu
                </div>
                <div
                  className="tbl-col"
                  style={{ width: "27%", textAlign: "right" }}
                >
                  {totalUnfinished()} phiếu
                </div>
                <div
                  className="tbl-col"
                  style={{ width: "18%", textAlign: "right", paddingRight: 15 }}
                >
                  TB: {moneyFormat(totalRevenue())} đ
                </div>
              </div>
            </div>
            {/* total */}
            {/* body */}
            <div className="report-table-body">
              {dataMain &&
                dataMain.length &&
                dataMain.map((item, index) => {
                  return (
                    <div className="tbl-item d-flex" key={index}>
                      <div className="tbl-col" style={{ width: "15%" }}>
                        {item.dateText || ""}
                      </div>
                      <div
                        className="tbl-col"
                        style={{ width: "15%", textAlign: "right" }}
                      >
                        {item.totalMc || 0} phiếu
                      </div>
                      <div
                        className="tbl-col"
                        style={{ width: "25%", textAlign: "right" }}
                      >
                        {item.success || 0} phiếu
                      </div>
                      <div
                        className="tbl-col"
                        style={{ width: "27%", textAlign: "right" }}
                      >
                        {item.unfinished || 0} phiếu
                      </div>
                      <div
                        className="tbl-col"
                        style={{
                          width: "18%",
                          textAlign: "right",
                          paddingRight: 15,
                        }}
                      >
                        {moneyFormat(item.revenue) || 0} đ
                      </div>
                    </div>
                  );
                })}
            </div>
            {/* body */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainReport;
