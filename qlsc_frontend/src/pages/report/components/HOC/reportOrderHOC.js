import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { getRevenueReport } from '../../actions/reportOrderActions';

const compareSearchParam = (prev, next) => {
  if (!prev || !next) return false;
  const prevSearchParams = new URLSearchParams(prev);
  const nextSearchParams = new URLSearchParams(next);
  prevSearchParams.delete('sort-type');
  prevSearchParams.delete('sort-field');

  nextSearchParams.delete('sort-type');
  nextSearchParams.delete('sort-field');
  return prevSearchParams.toString() === nextSearchParams.toString();
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function reportOrderHOC(WrappedComponent) {
  return withRouter((props) => {
    const { history } = props;
    const prevHistory = usePrevious(history.location.search);
    const [fetching, changeFetching] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
      if (!compareSearchParam(prevHistory, history.location.search)) {
        getRevenueReport(history.location.search).then(res => {
          changeFetching(false);
          if (res && res.data) {
            setData(res.data);
          } else {
            setData({ comparison: {}, revenues: []});
            SapoApp.flashError('Xảy ra lỗi khi lấy thông tin doanh thu');
          }
        }).catch(() => {
          SapoApp.flashError('Xảy ra lỗi khi lấy thông tin doanh thu');
          changeFetching(false);
        });
      }
    }, [history.location.search]);
    useEffect(() => {

    });
    return <WrappedComponent {...props} data={data} fetching={fetching} />
  })
}

export default reportOrderHOC;
