import React, { useState, useEffect } from "react";

import ChartRevenueDashboard from "./ChartRevenueDashboard";
import "./styles.scss";
const data2 = [
  {
    date_key: 20210507,
    week_key: 202118,
    month_key: 202105,
    date_text: "07/05/2021",
    month_text: "05/2021",
    day_of_week: 5,
    day_of_month: 7,
    month_of_year: 5,
    year: 2021,
    day_of_week_start_text: null,
    day_of_week_end_text: null,
    week_start_date_timestamp: null,
    week_end_date_timestamp: null,
    total_amount: 22.0,
    group_by: "day",
  },
  {
    date_key: 20210508,
    week_key: 202118,
    month_key: 202105,
    date_text: "08/05/2021",
    month_text: "05/2021",
    day_of_week: 6,
    day_of_month: 8,
    month_of_year: 5,
    year: 2021,
    day_of_week_start_text: null,
    day_of_week_end_text: null,
    week_start_date_timestamp: null,
    week_end_date_timestamp: null,
    total_amount: 0,
    group_by: "day",
  },
  {
    date_key: 20210509,
    week_key: 202118,
    month_key: 202105,
    date_text: "09/05/2021",
    month_text: "05/2021",
    day_of_week: 7,
    day_of_month: 9,
    month_of_year: 5,
    year: 2021,
    day_of_week_start_text: null,
    day_of_week_end_text: null,
    week_start_date_timestamp: null,
    week_end_date_timestamp: null,
    total_amount: 0,
    group_by: "day",
  },
  {
    date_key: 20210510,
    week_key: 202119,
    month_key: 202105,
    date_text: "10/05/2021",
    month_text: "05/2021",
    day_of_week: 1,
    day_of_month: 10,
    month_of_year: 5,
    year: 2021,
    day_of_week_start_text: null,
    day_of_week_end_text: null,
    week_start_date_timestamp: null,
    week_end_date_timestamp: null,
    total_amount: 9022442.0,
    group_by: "day",
  },
  {
    date_key: 20210511,
    week_key: 202119,
    month_key: 202105,
    date_text: "11/05/2021",
    month_text: "05/2021",
    day_of_week: 2,
    day_of_month: 11,
    month_of_year: 5,
    year: 2021,
    day_of_week_start_text: null,
    day_of_week_end_text: null,
    week_start_date_timestamp: null,
    week_end_date_timestamp: null,
    total_amount: 410111.0,
    group_by: "day",
  },
  {
    date_key: 20210512,
    week_key: 202119,
    month_key: 202105,
    date_text: "12/05/2021",
    month_text: "05/2021",
    day_of_week: 3,
    day_of_month: 12,
    month_of_year: 5,
    year: 2021,
    day_of_week_start_text: null,
    day_of_week_end_text: null,
    week_start_date_timestamp: null,
    week_end_date_timestamp: null,
    total_amount: 0,
    group_by: "day",
  },
  {
    date_key: 20210513,
    week_key: 202119,
    month_key: 202105,
    date_text: "13/05/2021",
    month_text: "05/2021",
    day_of_week: 4,
    day_of_month: 13,
    month_of_year: 5,
    year: 2021,
    day_of_week_start_text: null,
    day_of_week_end_text: null,
    week_start_date_timestamp: null,
    week_end_date_timestamp: null,
    total_amount: 0,
    group_by: "day",
  },
];
function ReportLeft(props) {
  const { data, fetching } = props;
  const [dataState, setDataState] = useState(data2);

  useEffect(() => {
    if (data && data.totalMonies) {
      setDataState(data.totalMonies);
    }
  }, [data]);

  const isLoading = false;

  return (
    <div className="report-revenue-component report-border ">
      <div className="report-title">Doanh thu dự kiến</div>
      <div className="content">
        <ChartRevenueDashboard revenue={data2} />
      </div>
    </div>
  );
}

export default React.memo(ReportLeft);
