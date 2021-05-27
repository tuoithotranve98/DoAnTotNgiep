import React from "react";
//components
import ReactHighcharts from "react-highcharts";
import { ChartConfig } from "components/Chart/ChartConfig";

function ChartRevenueDashboard(props) {
  const { revenue } = props;
  const getRevenueInfo = () => {
    let data = {
      listTime: [],
      totalAmount: [],
    };

    revenue.forEach((el) => {
      data = {
        listTime: data.listTime.concat(el.time),
        totalAmount: data.totalAmount.concat(el.total),
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
