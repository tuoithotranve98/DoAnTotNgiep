import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router';
import { getNewParams } from 'utils/urlUtil';
import pushstate from 'utils/pushstate';
import * as Icons from 'pages/report/commons/Icons';
import './styles.scss';
import DatetimeRangePicker from '../../../../../components/react-bootstrap-datetimerangepicker';

const convertDateToMoment = (day) => {
  return moment(day, 'DD/MM/YYYY');
};

const convertUnixToDate = (unix) => {
  return moment.unix(unix).format("DD/MM/YYYY");
};

const ranges = {
  'Hôm nay': [moment(), moment()],
  'Hôm qua': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  '7 ngày trước': [moment().subtract(6, 'days'), moment()],
  '30 ngày trước': [moment().subtract(29, 'days'), moment()],
  '90 ngày trước': [moment().subtract(89, 'days'), moment()],
};

const locale = {
  applyLabel: 'Áp dụng',
  cancelLabel: 'Hủy',
  format: 'DD/MM/YYYY',
  customRangeLabel: 'Tùy chọn thời gian',
  daysOfWeek: [
    'CN',
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
  ],
  monthNames: [
    'tháng 1',
    'tháng 2',
    'tháng 3',
    'tháng 4',
    'tháng 5',
    'tháng 6',
    'tháng 7',
    'tháng 8',
    'tháng 9',
    'tháng 10',
    'tháng 11',
    'tháng 12',
  ],
  separator: ' - ',
};

const getRenderStartDate = (start, end) => {
  let data = new Date();
  const localeTime = data.toLocaleDateString('en-GB');
  if (!start) {
    return `${localeTime} - ${localeTime}`;
  }
  const startDate = new Date(start);
  const endDate = new Date(end);
  return `${startDate.toLocaleDateString('en-GB')} - ${endDate.toLocaleDateString('en-GB')}`;
};

function FilterByDate() {
  const history = useHistory();
  const { search } = history.location;
  const searchParams = new URLSearchParams(search);
  const startTime = searchParams.get('s');
  const endTime = searchParams.get('e');
  const s = convertUnixToDate(startTime ? startTime : moment().subtract(6, 'days').unix());
  const e = convertUnixToDate(endTime ? endTime : moment().unix());
  const [startDate, setStartDate] = useState(startTime ? convertDateToMoment(s) : moment().subtract(6, 'days'));
  const [endDate, setEndDate] = useState(endTime ? convertDateToMoment(e) : moment());

  const onApply = (event, picker) => {
    const newParams = getNewParams(history.location.search, 's', picker.startDate.unix());
    const lastParams = getNewParams(`?${newParams}`, 'e', picker.endDate.unix());
    pushstate(history, `/report?${lastParams}`);
  };

  useEffect(() => {
    const startTime = searchParams.get('s');
    const endTime = searchParams.get('e');
    const s = convertUnixToDate(startTime ? startTime : moment().subtract(6, 'days').unix());
    const e = convertUnixToDate(endTime ? endTime : moment().unix());
    setStartDate(startTime ? convertDateToMoment(s) : moment().subtract(6, 'days'));
    setEndDate(endTime ? convertDateToMoment(e) : moment());
  }, [search]);

  return (
    <div
      className="report-filter-by-date"
    >
      <DatetimeRangePicker
        id="datetimeRangePicker"
        opens='right'
        drops='down'
        startDate={startDate}
        endDate={endDate}
        onApply={onApply}
        autoUpdateInput
        onCancel={() => {}}
        ranges={ranges}
        locale={locale}
        alwaysShowCalendars
        className="date-picker-wrapper"
        // disabled
        utc
        minDate={moment().subtract(1, 'year')}
      >
        <div className="d-flex align-items-center filter-date-content">
          <Icons.clockIcon />
          <div className="content">
            {s} - {e}
          </div>
          <Icons.dropdownIcon />
        </div>
      </DatetimeRangePicker>
    </div>
  );
}

export default FilterByDate;

