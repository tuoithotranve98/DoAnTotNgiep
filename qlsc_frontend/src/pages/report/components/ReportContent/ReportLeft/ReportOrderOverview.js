import React from 'react';
import OverviewInfo from './OverviewInfo/OverviewInfo';
import { useHistory } from 'react-router';

const getTotal = (statusesId) => {
  if (statusesId === 2) {
    return 'Tổng số tiền được ghi nhận trên đơn hàng khách phải trả (có tính cả các loại phí) có trạng thái = đã đóng gói.';
  }
  if (statusesId === 3) {
    return 'Tổng số tiền được ghi nhận trên đơn hàng khách phải trả (có tính cả các loại phí) có trạng thái = hoàn thành.';
  }
  return 'Tổng số tiền được ghi nhận trên đơn hàng khách phải trả (có tính cả các loại phí) có bất kì trạng thái nào.';
};

const getOrderQuantity = (statuses) => {
  if (statuses === 2) {
    return 'Tổng số đơn hàng đã đóng gói.';
  }
  if (statuses === 3) {
    return 'Tổng số đơn hàng đã hoàn thành.';
  }
  return 'Tổng số đơn hàng được khách đặt (bao gồm cả đơn đã hủy).'
};

function ReportOrderOverview(props) {
  const {
    data,
    viewActive,
    setViewActive,
  } = props;

  const history = useHistory();
  const { search } = history.location;
  const searchParams = new URLSearchParams(search);

  const statusesId = Number(searchParams.get('statuses-id')) || 1;

  const onClick = (id) => {
    if (viewActive.length === 1 && viewActive.includes(id)) {
      SapoApp.flashError('Vui lòng chọn tối thiểu 1 chỉ số');
      return false;
    }
    if (viewActive.includes(id)) {
      setViewActive(viewActive.filter(item => item !== id));
    } else {
      setViewActive(viewActive.concat(id));
    }
  };

  const {
    current_revenue,
    current_order_count,
    current_average_revenue,
    current_time,
    change_rate_revenue,
    change_rate_order_count,
    change_rate_average_revenue,
    last_period_revenue,
    last_period_order_count,
    last_period_average_revenue,
    last_period_time,
    day_count,
  } = data;
  return (
    <div className="d-flex align-items-center overview-wrapper">
      <OverviewInfo
        title="Tổng giá trị"
        value={current_revenue}
        color="#0C9EB8"
        changeValue={change_rate_revenue}
        isSelected={viewActive.includes(1)}
        handleClick={() => onClick(1)}
        currentTime={current_time}
        lastPeriodTime={last_period_time}
        lastValue={last_period_revenue}
        dayCount={day_count}
        unit={<span>&nbsp;đ</span>}
        suffix="đ"
        rounded={false}
        tooltipId="_tooltip_overview_revenue"
        tooltipText={getTotal(statusesId)}
      />
      <OverviewInfo
        title="Đơn hàng"
        value={current_order_count}
        color="#1E94D7"
        changeValue={change_rate_order_count}
        isSelected={viewActive.includes(2)}
        handleClick={() => onClick(2)}
        currentTime={current_time}
        lastPeriodTime={last_period_time}
        lastValue={last_period_order_count}
        dayCount={day_count}
        tooltipId="_tooltip_overview_order_count"
        tooltipText={getOrderQuantity(statusesId)}
      />
      <OverviewInfo
        title="Tổng giá trị/ đơn"
        value={current_average_revenue}
        color="#34CF97"
        changeValue={change_rate_average_revenue}
        isSelected={viewActive.includes(3)}
        handleClick={() => onClick(3)}
        currentTime={current_time}
        lastPeriodTime={last_period_time}
        lastValue={last_period_average_revenue}
        dayCount={day_count}
        unit={<span>&nbsp;đ</span>}
        suffix="đ"
        place="left"
        tooltipId="_tooltip_overview_order_avg"
      />
    </div>
  );
}

ReportOrderOverview.defaultProps = {
  data: {},
};

export default ReportOrderOverview;
