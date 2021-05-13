import React from "react";
import "./styles.scss";

function LineRight() {
  const renderLineItem = () => {
    return (
      <div className="cnt-body">
        <div className="line-item">
          <div className="cnt" style={{ width: "50%" }}>
            Dịch vụ thay dầu
          </div>
          <div className="cnt" style={{ width: "50%", textAlign: "right" }}>
            10
          </div>
        </div>
        <div className="line-item">
          <div className="cnt" style={{ width: "50%" }}>
            Dịch vụ thay xăm
          </div>
          <div className="cnt" style={{ width: "50%", textAlign: "right" }}>
            10
          </div>
        </div>
        <div className="line-item">
          <div className="cnt" style={{ width: "50%" }}>
            Dịch vụ rửa xe
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
      <div className="report-title">Dịch vụ nổi bật</div>
      <div className="content">
        <div className="cnt-header">
          <div className="title" style={{ width: "50%" }}>
            Tên dịch vụ
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

export default LineRight;
