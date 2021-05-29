import React from "react";
import "./styles.scss";
import { moneyFormat } from "../../../../../utils/moneyFormat";
import ChartEmpty from "./ChartEmpty";

function LineLeft(props) {
  const { data } = props;
  const renderLineItem = () => {
    return (
      <div className="cnt-body">
        {data.length &&
          data.map((item, index) => {
            return (
              <div className="line-item" key={index}>
                <div className="cnt" style={{ width: "35%" }}>
                  {item.name || ""}
                </div>
                <div
                  className="cnt"
                  style={{ width: "35%", textAlign: "center" }}
                >
                  {item.total || ""} phiếu
                </div>
                <div
                className="cnt"
                style={{ width: "35%", textAlign: "right" }}
                >
                  {moneyFormat(item.money) || 0 } đ
                </div>
              </div>
            );
          })}
      </div>
    );
  };
  return (
    <div className="report-top-staff-component report-border ">
      <div className="report-title">Nhân viên nổi bật</div>
      <div className="content">
        {data && !data.length ? (
          <ChartEmpty text="Không đủ dữ liệu để hiển thị" />
        ) : (
          <React.Fragment>
            <div className="cnt-header">
              <div className="title" style={{ width: "35%" }}>
                Tên nhân viên
              </div>
              <div
                className="title"
                style={{ width: "35%", textAlign: "center" }}
              >
                Tổng số phiếu
              </div>
              <div
                className="title"
                style={{ width: "30%", textAlign: "right" }}
              >
                Doanh thu
              </div>
            </div>
            {renderLineItem()}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default LineLeft;
