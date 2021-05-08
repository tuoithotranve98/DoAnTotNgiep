import React from 'react';

export const ChartConfig = {
  // k hiện highchart.com bên phải dưới màn hình
  credits: {
    text: '',
  },
  // menu bên phải: xuất ảnh chart....
  exporting: {
    enabled: false,
  },
  // k hiện tiêu đề biểu đồ
  title: {
    text: null,
  },
  // ghi chú tên cột, line c name là gì
  legend: {
    align: 'center',
    symbolWidth: 20,
    symbolRadius: 0,
    squareSymbol: false,
    itemStyle: {
      'color': ' #212B35',
      'cursor': 'pointer',
      'fontSize': '13px',
      'fontWeight': '500',
      'textOverflow': 'ellipsis',
      'fontFamily': 'Segoe UI',
    },
  },
  xAxis: [],
  yAxis: [],
  tooltip: {
    shared: true,
  },
  lang: {
    numericSymbols: ['K', 'M', 'B', 'T', 'P', 'E'],
    thousandsSep: ',',
  },
  series: [],

};