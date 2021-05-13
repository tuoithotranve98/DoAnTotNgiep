import React from "react";
//components
import ReactHighcharts from "react-highcharts";
import { ChartConfig } from "components/Chart/ChartConfig";

const getDateMonthYear = (objTime, groupBy) => {
  let time = "";
  if (groupBy === "day") {
    time = time
      .concat(
        objTime.day_of_month <= 9
          ? `0${objTime.day_of_month}/`
          : `${objTime.day_of_month}/`
      )
      .concat(
        objTime.month_of_year <= 9
          ? `0${objTime.month_of_year}`
          : `${objTime.month_of_year}`
      );
  }
  if (groupBy === "week") {
    let startDay = "";
    let startWeek = "";
    let endDay = "";
    let endWeek = "";
    if (objTime.day_of_week_start_text) {
      startDay =
        parseInt(objTime.day_of_week_start_text.split("/")[0]) <= 9
          ? `0${objTime.day_of_week_start_text.split("/")[0]}`
          : `${objTime.day_of_week_start_text.split("/")[0]}`;
      startWeek =
        parseInt(objTime.day_of_week_start_text.split("/")[1]) <= 9
          ? `0${objTime.day_of_week_start_text.split("/")[1]}`
          : `${objTime.day_of_week_start_text.split("/")[1]}`;
    }
    if (objTime.day_of_week_end_text) {
      endDay =
        parseInt(objTime.day_of_week_end_text.split("/")[0]) <= 9
          ? `0${objTime.day_of_week_end_text.split("/")[0]}`
          : `${objTime.day_of_week_end_text.split("/")[0]}`;
      endWeek =
        parseInt(objTime.day_of_week_end_text.split("/")[1]) <= 9
          ? `0${objTime.day_of_week_end_text.split("/")[1]}`
          : `${objTime.day_of_week_end_text.split("/")[1]}`;
    }
    time = time.concat(`${startDay}/${startWeek} - ${endDay}/${endWeek}`);
  }
  if (groupBy === "month") {
    time = time
      .concat(
        objTime.month_of_year <= 9
          ? `0${objTime.month_of_year}/`
          : `${objTime.month_of_year}/`
      )
      .concat(objTime.year);
  }
  if (groupBy === "year") {
    time = objTime.year;
  }
  return time;
};

function ChartRevenueDashboard(props) {
  const { revenue } = props;
  const getRevenueInfo = () => {
    let data = {
      listTime: [],
      totalAmount: [],
    };

    revenue.forEach((el) => {
      data = {
        listTime: data.listTime.concat(getDateMonthYear(el, el.group_by)),
        totalAmount: data.totalAmount.concat(el.total_amount),
      };
    });
    return data;
  };

  const revenueParse = getRevenueInfo();
  const configChart = {
    ...ChartConfig,
    chart: {
      height: 236,
      type: "areaspline",
    },
    colors: ["#59D189"],
    xAxis: {
      categories: revenueParse.listTime,
      crosshair: true,
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.2,
      },
    },
    tooltip: {
      shared: true,
      valueSuffix: " đ",
    },
    series: [
      {
        data: revenueParse.totalAmount,
        name: "Doanh thu dự kiến",
      },
    ],
  };

  return (
    <div className="chart highcharts-figure">
      <ReactHighcharts config={configChart} />
    </div>
  );
}

ChartRevenueDashboard.defaultProps = {
  revenue: [],
};

export default ChartRevenueDashboard;
