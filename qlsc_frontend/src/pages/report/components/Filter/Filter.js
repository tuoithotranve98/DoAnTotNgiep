import React from 'react';
import FilterByDate from './FilterByDate/FilterByDate';
import "./styles.scss";

function Filter(props) {
  const { onChangeTime, tab } = props;

  const renderTextHeader = () => {
    if (tab === 1) return 'Tổng quan báo cáo';
    if (tab === 2) return 'Thống kê phiếu sửa chữa';
    if (tab === 3) return 'Thống kê linh kiện';
    if (tab === 4) return 'Thống kê nhân viên';
    return null;
  }

  return (
    <div className="d-flex flex-wrap align-items-center">
      <div className="title-report-dashboard">{renderTextHeader()}</div>
      <FilterByDate onChangeTime={onChangeTime} />
    </div>
  );
}

export default React.memo(Filter);
