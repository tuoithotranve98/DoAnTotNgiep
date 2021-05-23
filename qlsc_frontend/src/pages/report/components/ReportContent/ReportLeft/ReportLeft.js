import React, { useState, useEffect } from "react";

import ChartRevenueDashboard from "./ChartRevenueDashboard";
import "./styles.scss";
const data2 = [
  {
    date_text: "07/05",
    month_text: "05/2021",
    day_of_month: 7,
    month_of_year: 5,
    year: 2021,
    total_amount: 22.0,
  },
  {
    date_text: "08/05",
    month_text: "05/2021",
    day_of_month: 8,
    month_of_year: 5,
    year: 2021,
    total_amount: 0,
  },
  {
    date_text: "09/05",
    month_text: "05/2021",
    day_of_month: 9,
    month_of_year: 5,
    year: 2021,
    total_amount: 0,
  },
  {
    date_text: "10/05",
    month_text: "05/2021",
    day_of_month: 10,
    month_of_year: 5,
    year: 2021,
    total_amount: 9022442.0,
  },
  {
    date_text: "11/05",
    month_text: "05/2021",
    day_of_month: 11,
    month_of_year: 5,
    year: 2021,
    total_amount: 410111.0,
  },
  {
    date_text: "12/05",
    month_text: "05/2021",
    day_of_month: 12,
    month_of_year: 5,
    year: 2021,
    total_amount: 0,
  },
  {
    date_text: "13/05",
    month_text: "05/2021",
    day_of_month: 13,
    month_of_year: 5,
    year: 2021,
    total_amount: 0,
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
      <div className="report-title">Doanh thu cửa hàng</div>
      <div className="content">
        <ChartRevenueDashboard revenue={dataState} />
      </div>
    </div>
  );
}

export default React.memo(ReportLeft);
