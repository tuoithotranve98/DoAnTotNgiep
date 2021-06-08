import React from "react";
import ReportProduct from "../Report/Report";
import { moneyFormat } from "../../../../utils/moneyFormat";
import "./styles.scss";

function AccessoriesReport(props) {
  const { accessories } = props;

  const total = () => {
    let total = 0;
    accessories.forEach((item) => (total += 1));
    return total;
  };

  const totalQuantity = () => {
    let total = 0;
    accessories.forEach((item) => (total += item.quantity));
    return total;
  };

  const totalUsed = () => {
    let total = 0;
    accessories.forEach((item) => (total += item.countProduct));
    return total;
  };
  const totalRevenue = () => {
    let total = 0;
    accessories.forEach((item) => (total += item.revenue));
    return total;
  };
  return (
    <div className="report-content-container">
      <div className="revenue-role-accessories-chart">
        <div className="revenue-main report-border">
          <div className="report-title">Top { accessories && accessories.length } linh kiện</div>
          <ReportProduct data={accessories} />
        </div>
      </div>
      <div className="accessories-report-table">
        <div className="table-accessories-report">
          <div className="report-table">
            {/* header */}
            <div className="report-table-header  d-flex">
              <div className="tbl-header" style={{ width: "15%" }}>
                Mã linh kiện
              </div>
              <div
                className="tbl-header"
                style={{ width: "15%", textAlign: "right" }}
              >
                Tên linh kiện
              </div>
              <div
                className="tbl-header"
                style={{ width: "25%", textAlign: "right" }}
              >
                Số lượng còn
              </div>
              <div
                className="tbl-header"
                style={{ width: "27%", textAlign: "right" }}
              >
                Số lượng đã sử dụng
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
                  {total()} linh kiện
                </div>
                <div
                  className="tbl-col"
                  style={{ width: "25%", textAlign: "right" }}
                >
                  {totalQuantity()} cái/chiếc
                </div>
                <div
                  className="tbl-col"
                  style={{ width: "27%", textAlign: "right" }}
                >
                  {totalUsed()} cái/chiếc
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
              {accessories &&
                accessories.length &&
                accessories.map((item, index) => {
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
                        {item.quantity || 0}
                      </div>
                      <div
                        className="tbl-col"
                        style={{ width: "27%", textAlign: "right" }}
                      >
                        {item.countProduct || 0}
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

export default AccessoriesReport;
