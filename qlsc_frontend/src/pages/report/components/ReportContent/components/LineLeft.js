import React from "react";
import "./styles.scss";

function LineLeft() {
  const renderLineItem = () => {
    return (
      <div className="cnt-body">
        <div className="line-item">
          <div className="cnt" style={{ width: "50%" }}>
            Bui manh
          </div>
          <div className="cnt" style={{ width: "50%", textAlign: "right" }}>
            10
          </div>
        </div>
        <div className="line-item">
          <div className="cnt" style={{ width: "50%" }}>
            Bui manh
          </div>
          <div className="cnt" style={{ width: "50%", textAlign: "right" }}>
            10
          </div>
        </div>
        <div className="line-item">
          <div className="cnt" style={{ width: "50%" }}>
            Bui manh
          </div>
          <div className="cnt" style={{ width: "50%", textAlign: "right" }}>
            10
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="report-top-staff-component report-border ">
      <div className="report-title">Nhân viên nổi bật</div>
      <div className="content">
        <div className="cnt-header">
          <div className="title" style={{ width: "50%" }}>
            Tên nhân viên
          </div>
          <div className="title" style={{ width: "50%", textAlign: "right" }}>
            Tổng số phiếu
          </div>
        </div>
        {renderLineItem()}
      </div>
    </div>
  );
}

export default LineLeft;
