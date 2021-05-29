import React from "react";
import "./styles.scss";

function TabReport(props) {
  const { tab, onChangeTab } = props;
  return (
    <div className="nav-tab-horizontal-report" id="nav-tab-horizontal-report">
      <ul className="nav nav-tabs-report">
        <li
          className={`${tab === 1 ? "active" : ""}`}
          onClick={() => onChangeTab(1)}
        >
          Tổng quan
        </li>
        <li
          className={`${tab === 2 ? "active" : ""}`}
          onClick={() => onChangeTab(2)}
        >
          Phiếu sửa chữa
        </li>
        <li
          className={`${tab === 3 ? "active" : ""}`}
          onClick={() => onChangeTab(3)}
        >
          Linh kiện
        </li>
        <li
          className={`${tab === 4 ? "active" : ""}`}
          onClick={() => onChangeTab(4)}
        >
          Nhân viên
        </li>
      </ul>
    </div>
  );
}

export default TabReport;
