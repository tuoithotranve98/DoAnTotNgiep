import React, { useEffect, useState } from 'react';

import * as Icons from 'pages/report/commons/Icons';
import { useHistory } from 'react-router';

import './styles.scss';

const defaultData = {
  cancelled: 0,
  delivered: 0,
  other: 0,
  pending: 0,
  quantity: 0,
  ready: 0,
  shipped: 0,
  total: 0,
};

const nf = new Intl.NumberFormat('en');

const convertMoney = (value) => {
  if (value > 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`;
  }
  if (value > 1000000) {
    if (value % 1000000 === 0) {
      return `${(value / 1000000)}M`;
    }
    return `${(value / 1000000).toFixed(1)}M`;
  }
  return nf.format(value);
};

function ReportRight(props) {
//   const [data, setData] = useState({ ...defaultData });
  const [fetching, setFetching] = useState(true);
  const history = useHistory();
//   const searchParam = history.location.search;
//   const param = new URLSearchParams(searchParam);
//   const cIds = param.get('cIds');

//   useEffect(() => {
//     getToday(searchParam)
//       .then((json) => {
//         setFetching(false);
//         if (json && json.data) {
//           setData(json.data);
//         } else {
//           SapoApp.flashError('Đã xảy ra lỗi khi lấy báo cáo nhanh hôm nay');
//         }
//       })
//       .catch(() => {
//         setFetching(false);
//       });
//   }, [cIds]);

//   if (fetching) {
//     return (
//       <div className="report-card">
//         <div className="d-flex align-items-center general-header general-report-header">
//         <span className="title">
//           Báo cáo nhanh hôm nay
//         </span>
//         </div>
//         <ChartLoading/>
//       </div>
//     );
//   }

//   if (data.total === undefined) {
//     return (
//       <div className="report-card">
//         <ChartEmpty/>
//       </div>
//     );
//   }

  return (
    <React.Fragment>
      <div
        style={{
          padding: 10,
          background: '#FFF',
          boxShadow: '1px 1px 1px rgb(0 0 0 / 25%)',
          borderRadius: 6,
          border: '1px solid #E3E3E3',
          boxSizing: 'border-box',
        }}
      >
        <div className="d-flex align-items-center general-header general-report-header">
        <span className="title">
          Báo cáo nhanh hôm nay
        </span>
        </div>
        <div className="d-flex align-items-center justify-content-between general-header general-info">
          <div className="d-flex align-items-center general-info-content">
            <Icons.dollarIcon/>
            <div className="content">
              <div className="quantity">
                {convertMoney(222222)}
              </div>
              <div>
                Tổng giá trị
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center general-info-content">
            <Icons.bagIcon/>
            <div className="content">
              <div className="quantity">
                25
              </div>
              <div>
                Đơn hàng
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          padding: 10,
          background: '#FFF',
          boxShadow: '1px 1px 1px rgb(0 0 0 / 25%)',
          borderRadius: 6,
          border: '1px solid #E3E3E3',
          boxSizing: 'border-box',
          marginTop: 8,
        }}
      >
        <div className="d-flex align-items-center justify-content-between general-header general-report-header">
        <span className="title">
          Danh sách cần làm
        </span>
          {/*<a className="learn-more">*/}
          {/*  Tìm hiểu thêm*/}
          {/*</a>*/}
        </div>
        <div className="d-flex align-items-center flex-wrap instant-param">
          <div className="d-flex align-items-center flex-wrap item-info border-right">
          <span className="value">
            44
          </span>
            <span>
            Chờ xác nhận
          </span>
          </div>
          <div className="d-flex align-items-center flex-wrap item-info ">
          <span className="value">
            123
          </span>
            <span>
            Chờ lấy hàng
          </span>
          </div>
          <div className="d-flex align-items-center flex-wrap item-info border-right">
          <span className="value">
            2
          </span>
            <span>
            Chờ hủy
          </span>
          </div>
          <div className="d-flex align-items-center flex-wrap item-info">
          <span className="value">
            12
          </span>
            <span>
            Đang vận chuyển
          </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

ReportRight.defaultProps = {
  data: {},
};

export default ReportRight;
