import React from "react";
import TodayItem from "../components/TodayItem";
import * as ReportIcons from './Icons';
import "./styles.scss";
import { moneyFormat } from "../../../../../utils/moneyFormat";

function ReportRight(props) {
  const { data } = props;
  const listItem = [
    {
      id: 0,
      backgroundColorCustom: '#effbf8',
      name: 'Doanh thu',
      value: `${moneyFormat(data.totalMoney) || 0} đ`,
      icon: <ReportIcons.IconTotal />,
    },
    {
      id: 1,
      backgroundColorCustom: '#fef7ff',
      name: 'Phiếu sửa mới',
      value: data.totalMaintenanceCard,
      icon: <ReportIcons.IconMainCard1 />,
    },
    {
      id: 2,
      backgroundColorCustom: '#eff9fc',
      name: 'Phiếu đang sửa',
      value: data.totalMaintenanceCardRepair,
      icon: <ReportIcons.IconMainCard2 />,
    },
    {
      id: 3,
      backgroundColorCustom: '#fef5f5',
      name: 'Phiếu hoàn thành',
      value: data.totalMaintenanceCardSuccess,
      icon: <ReportIcons.IconMainCard3 />,
    },
  ];
  return (
    <React.Fragment>
      <div className="report-today-component report-border ">
        <div className="report-title">Báo cáo nhanh Hôm nay</div>
        <div className="content">
          {listItem.map((item, index) => {
            return (
              <TodayItem data={item} key={index} />
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
