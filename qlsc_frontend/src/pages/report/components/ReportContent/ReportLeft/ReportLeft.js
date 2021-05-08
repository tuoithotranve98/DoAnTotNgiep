import React, { useState } from 'react';

import { useHistory } from 'react-router';
import ReportOrderOverview from './ReportOrderOverview';
import Chart from './Chart'
import './styles.scss';
const dataTest = {
    change_rate_average_revenue: -100,
    change_rate_order_count: -100,
    change_rate_revenue: -100,
    current_average_revenue: 0,
    current_order_count: 0,
    current_revenue: 0,
    current_time: "01/05/2021 - 07/05/2021",
    day_count: 7,
    last_period_average_revenue: 74411.76,
    last_period_order_count: 17,
    last_period_revenue: 1265000,
    last_period_time: "24/04/2021 - 30/04/2021",
}
const data2 =[
   {time: "07/05/2021", total: 0, quantity: 0, average: 0},
{time: "06/05/2021", total: 0, quantity: 0, average: 0},
{time: "05/05/2021", total: 0, quantity: 0, average: 0},
 {time: "04/05/2021", total: 0, quantity: 0, average: 0},
 {time: "03/05/2021", total: 0, quantity: 0, average: 0},
 {time: "02/05/2021", total: 0, quantity: 0, average: 0},
 {time: "01/05/2021", total: 0, quantity: 0, average: 0},
]
function ReportLeft(props) {
  const { data, fetching } = props;
  const [viewActive, setViewActive] = useState([1]);
  const history = useHistory();
  const { search } = history.location;
  const searchParams = new URLSearchParams(search);
  const group = searchParams.get('group');

//   const onDirect = () => {
//     pushstate(history, '/home/report?type=2');
//   };

//   if (fetching) {
//     return (
//       <div className="report-card">
//         <div className="d-flex align-items-center justify-content-between general-header general-report-header">
//         <span className="title">
//           Giá trị đơn hàng
//         </span>
//           <a
//             className="direct"
//             onClick={onDirect}
//           >
//             Báo cáo Đơn hàng
//             <Icons.arrowRightIcon />
//           </a>
//         </div>
//         <ChartLoading />
//       </div>
//     );
//   }

//   if (!data.comparison || !data.revenues) {
//     return (
//       <div className="report-card">
//         <ChartEmpty />
//       </div>
//     )
//   }

  return (
    <div className="report-card">
      <div className="d-flex align-items-center justify-content-between general-header general-report-header">
        <span className="title">
          Giá trị đơn hàng
        </span>
        {/* <a
          className="direct"
          onClick={onDirect}
        >
          Báo cáo Đơn hàng
          <Icons.arrowRightIcon />
        </a> */}
      </div>
      <div className='report-general-order'>
        <ReportOrderOverview
          data={dataTest}
          viewActive={viewActive}
          setViewActive={setViewActive}
        />
        <Chart
          data={data2}
          viewActive={viewActive}
          setViewActive={setViewActive}
          group={'day'}
        />
      </div>
    </div>
  );
}

// export default reportOrderHOC(ReportLeft);
export default React.memo(ReportLeft);
