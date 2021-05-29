import React from "react";
import ChartEmpty from "./ChartEmpty";
import "./styles.scss";

function LineRight(props) {
  const { data } = props;
  const renderLineItem = () => {
    return (
      <div className="cnt-body">
        {data.length &&
          data.map((item, index) => {
            return (
              <div className="line-item" key={index}>
                <div className="cnt" style={{ width: "50%" }}>
                  {item.name || ""}
                </div>
                <div
                  className="cnt"
                  style={{ width: "50%", textAlign: "right" }}
                >
                  {item.total || 0} phiếu
                </div>
              </div>
            );
          })}
      </div>
    );
  };
  return (
    <div className="report-top-staff-component report-border ">
      <div className="report-title">Dịch vụ nổi bật</div>
      <div className="content">
        {data && !data.length ? (
          <ChartEmpty text="Không đủ dữ liệu để hiển thị" />
        ) : (
          <React.Fragment>
            <div className="cnt-header">
              <div className="title" style={{ width: "50%" }}>
                Tên dịch vụ
              </div>
              <div
                className="title"
                style={{ width: "50%", textAlign: "right" }}
              >
                Tổng số phiếu
              </div>
            </div>
            {renderLineItem()}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default LineRight;
