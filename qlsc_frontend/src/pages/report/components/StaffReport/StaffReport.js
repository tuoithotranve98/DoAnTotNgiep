import React from "react";
import ReportProduct from "../Report/Report";
import { moneyFormat } from "../../../../utils/moneyFormat";
import "./styles.scss";

function StaffReport(props) {
  const { dataStaff } = props;
  const total = () => {
    let total = 0;
    dataStaff.forEach((item) => (total += item.numberOfMc));
    return total;
  };

  const totalRevenue = () => {
    let total = 0;
    dataStaff.forEach((item) => (total += item.revenue));
    return total;
  };
  return (
    <div className="report-content-container">
      <div className="revenue-role-accessories-chart">
            <div className="revenue-main report-border">
              <div className="report-title">Top {dataStaff && dataStaff.length} nhân viên sửa chữa</div>
              <ReportProduct data={dataStaff} />
            </div>
          </div>
      <div className="accessories-report-table">
        <div className="table-accessories-report">
          <div className="report-table">
            {/* header */}
            <div className="report-table-header  d-flex">
              <div className="tbl-header" style={{ width: "15%" }}>
                Mã nhân viên
              </div>
              <div
                className="tbl-header"
                style={{ width: "15%", textAlign: "right" }}
              >
                Tên nhân viên
              </div>
              <div
                className="tbl-header"
                style={{ width: "25%", textAlign: "right" }}
              >
                Chức vụ nhân viên
              </div>
              <div
                className="tbl-header"
                style={{ width: "27%", textAlign: "right" }}
              >
                Số phiếu đã nhận
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
                ></div>
                <div
                  className="tbl-col"
                  style={{ width: "25%", textAlign: "right" }}
                ></div>
                <div
                  className="tbl-col"
                  style={{ width: "27%", textAlign: "right" }}
                >
                  {total()} phiếu
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
              {dataStaff &&
                dataStaff.length &&
                dataStaff.map((item, index) => {
                  return (
                    <div className="tbl-item d-flex" key={index}>
                      <div className="tbl-col" style={{ width: "15%" }}>
                        {item.code || ""}
                      </div>
                      <div
                        className="tbl-col"
                        style={{ width: "15%", textAlign: "right" }}
                      >
                        {item.name || ""}
                      </div>
                      <div
                        className="tbl-col"
                        style={{ width: "25%", textAlign: "right" }}
                      >
                        {item.position || ""}
                      </div>
                      <div
                        className="tbl-col"
                        style={{ width: "27%", textAlign: "right" }}
                      >
                        {item.numberOfMc || 0} phiếu
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

export default StaffReport;
