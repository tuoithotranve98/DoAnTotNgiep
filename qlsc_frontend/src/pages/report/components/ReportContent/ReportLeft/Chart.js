import React from 'react';
import ReactHighcharts from 'react-highcharts';
import classname from 'classname';
import { ChartConfig } from 'components/Chart/ChartConfig';
import { useHistory } from 'react-router';

const isSameYear = (data) => {
  let isSame = true;
  if (!data.length) return false;
  let firstYear = data[0].time.split('/')[2];
  data.forEach(item => {
    const time = item.time;
    const timeList = time.split('/');
    if (firstYear !== timeList[2]) {
      isSame = false;
    }
  });
  return isSame;
};

const getXCategories = (data, group) => {
  if (!data.length) return [];
  if (group && group !== 'day') {
    return data.map(d => d.time);
  }
  const isSame = isSameYear(data);
  return data.map(item => {
    if (isSame) {
      const time = item.time;
      const timeList = time.split('/');
      return `${timeList[0]}/${timeList[1]}`;
    } else {
      return item.time;
    }
  });
};

const getTotal = (data) => {
  return data.map(it => {
    return it.total;
  });
};

const getQuantity = (data) => {
  return data.map(it => {
    return it.quantity;
  });
};

const getAverage = (data) => {
  return data.map(it => {
    return Number(it.average.toFixed());
  });
};

function Chart(props) {
  const {
    data: revenue,
    viewActive,
    setViewActive,
    group,
  } = props;
  const data = [...revenue].reverse();
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
    // setViewActive([id]);
  };

  const getColor = () => {
    if (viewActive.includes(1)) {
      return 'rgba(12, 158, 184, 0.1)';
    } else if (viewActive.includes(2)) {
      return 'rgba(30, 148, 215, 0.1)';
    } else {
      return 'rgba(52, 207, 151, 0.1)';
    }
  };

  const getSeries = () => {
    const series = [];
    if (viewActive.includes(1)) {
      series.push({
        name: 'Tổng giá trị',
        data: getTotal(data),
        color: '#0C9EB8',
        marker: {
          enabled: false,
          symbol: 'circle',
        },
        tooltip: {
          shared: true,
          valueSuffix: ' đ',
        },
        yAxis: 0,
      });
    }
    if (viewActive.includes(2)) {
      series.push({
        name: 'Đơn hàng',
        data: getQuantity(data),
        color: '#1E94D7',
        marker: {
          enabled: false,
          symbol: 'circle',
        },
        yAxis: 1,
      });
    }
    if (viewActive.includes(3)) {
      series.push({
        name: 'Tổng giá trị/ đơn',
        data: getAverage(data),
        color: '#34CF97',
        marker: {
          enabled: false,
          symbol: 'circle',
        },
        tooltip: {
          shared: true,
          valueSuffix: ' đ',
        },
        yAxis: 2,
      });
    }
    return series;
  };

  const configChart = {
    ...ChartConfig,
    chart: {
      height: 187,
      type: 'areaspline',
    },
    xAxis: [{
      categories: getXCategories(data, group),
      crosshair: true,
    }],
    legend: {
      enabled: false,
    },
    yAxis: [{
      //visible: false,
      labels: {
        enabled: false,
      },
      title: {
        enabled: false,
      },
    }, {
      //visible: false,
      labels: {
        enabled: false,
      },
      title: {
        enabled: false,
      },
    }, {
      //visible: false,
      labels: {
        enabled: false,
      },
      title: {
        enabled: false,
      },
    }],
    plotOptions: {
      areaspline: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, getColor()],
            [1, getColor()]
          ]
        },
      },
    },
    tooltip: {
      shared: true,
      borderColor: '#C4C4C4',
      shadow: '1px 1px 5px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#FFFFFF',
      borderRadius: 4,
    },
    series: getSeries(),
  };
  return (
    <div className="chart highcharts-figure">
      <ReactHighcharts config={configChart} />
      <div className="list-legend">
        <div
          className={classname('div-legend', { faded: !viewActive.includes(1)})}
          onClick={() => onClick(1)}
          role="presentation"
        >
          <div className="circle-icon" style={{ background: '#0C9EB8' }} />
          Tổng giá trị
        </div>
        <div
          className={classname('div-legend', { faded: !viewActive.includes(2)})}
          onClick={() => onClick(2)}
          role="presentation"
        >
          <div className="circle-icon" style={{ background: '#1E94D7' }} />
          Đơn hàng
        </div>
        <div
          className={classname('div-legend', { faded: !viewActive.includes(3)})}
          onClick={() => onClick(3)}
          role="presentation"
        >
          <div className="circle-icon" style={{ background: '#34CF97' }} />
          Tổng giá trị/ đơn
        </div>
      </div>
    </div>
  );
}

Chart.defaultProps = {
  data: [],
};

export default React.memo(Chart);
