import React, { useEffect, useState } from "react";
import TodayItem from "../components/TodayItem";
import "./styles.scss";
function ReportRight(props) {
  const listItem = [
    {
      id: 0,
      backgroundColorCustom: '#effbf8',
      name: 'Doanh thu dự kiến',
      value: `0 đ`,
      icon: null,
    },
    {
      id: 1,
      backgroundColorCustom: '#fef7ff',
      name: 'Tỷ lệ chuyển đổi',
      value: `0 đ`,
      icon: null,
    },
    {
      id: 2,
      backgroundColorCustom: '#eff9fc',
      name: 'Khách tương tác',
      value: `0 đ`,
      icon: null,
    },
    {
      id: 3,
      backgroundColorCustom: '#fef5f5',
      name: 'TG phản hồi tin nhắn',
      value: `0 đ`,
      icon: null,
    },
  ];
  return (
    <React.Fragment>
      <div className="report-today-component report-border ">
        <div className="report-title">Báo cáo nhanh Hôm nay</div>
        <div className="content">
          {listItem.map((item) => {
            return (
              <TodayItem data={item} key={item.id} />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

ReportRight.defaultProps = {
  data: {},
};

export default ReportRight;
