import React from "react";
import ReactHighcharts from "react-highcharts";
import { ChartConfig } from "components/Chart/ChartConfig";

const getName = (text) => {
  return text ? `${text.slice(0, 20)}...` : "";
};

const getXCategories = (data, type) => {
  switch (type) {
    case 2: {
      return data.map((item, index) => {
        return {
          name: getName(item.variation_name),
          y: item.quantity,
          color: index % 2 ? "#D9D9D9" : "#5CBFD1",
          id: item.variation_name,
        };
      });
    }
    default: {
      return data.map((item, index) => {
        return {
          name: getName(item.name),
          y: item.revenue,
          color: index % 2 ? "#D9D9D9" : "#5CBFD1",
          id: item.code,
        };
      });
    }
  }
};

const getSeriesName = (type) => {
  switch (type) {
    case 2:
      return "Số lượng bán";
    case 3:
      return "Tỷ lệ hủy";
    case 4:
      return "Số lượng hủy";
    default:
      return "Giá trị";
  }
};

const getSuffix = (type) => {
  switch (type) {
    case 2:
      return " sản phẩm";
    case 3:
      return " %";
    case 4:
      return " sản phẩm";
    default:
      return " đ";
  }
};

function Chart(props) {
  const { data, type } = props;

  const configChart = {
    ...ChartConfig,
    chart: {
      type: "column",
    },
    subtitle: {},
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: "category",
      uniqueNames: false,
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: false,
          // format: '{point.y:.1f}%'
        },
      },
    },

    tooltip: {
      // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b>'
    },
    series: [
      {
        name: getSeriesName(type),
        colorByPoint: true,
        data: getXCategories(data, type),
        tooltip: {
          shared: true,
          valueSuffix: getSuffix(type),
        },
      },
    ],
  };
  return (
    <div className="chart highcharts-figure">
      <ReactHighcharts config={configChart} />
    </div>
  );
}

Chart.defaultProps = {
  data: [],
};

export default Chart;
