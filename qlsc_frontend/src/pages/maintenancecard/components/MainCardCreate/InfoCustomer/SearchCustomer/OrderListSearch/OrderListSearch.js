/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import OrderItemSearch from './OrderItemSearch';


function OrderListSearch(props) {
  const {
    onClick , list
  } = props;
  const {
    fetching,
  } = props;
  // if (fetching) {
  //   return (
  //     <Guard />
  //   );
  // }
  if (list.length === 0) {
    return (
      <div className="no-content-found">
        <svg width="109" height="109" viewBox="0 0 109 109" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40.875 68.125C25.8194 68.125 13.625 55.9306 13.625 40.875C13.625 25.8194 25.8194 13.625 40.875 13.625C55.9306 13.625 68.125 25.8194 68.125 40.875C68.125 55.9306 55.9306 68.125 40.875 68.125ZM107.004 97.3711L74.1677 64.5348C78.9228 57.8586 81.75 49.704 81.75 40.875C81.75 18.3052 63.4448 0 40.875 0C18.3052 0 0 18.3052 0 40.875C0 63.4448 18.3052 81.75 40.875 81.75C49.704 81.75 57.8517 78.9228 64.5348 74.1677L97.3711 107.004C98.6995 108.332 100.437 109 102.188 109C103.938 109 105.676 108.332 107.004 107.004C109.661 104.347 109.661 100.035 107.004 97.3711Z" fill="#C3CFD8"/>
        </svg>
        <div className="text">
          Không tìm thấy khách hàng
        </div>
      </div>
    );
  }
  return (
    <React.Fragment>
      {
        list.map((item, index) => {
          return (
            <OrderItemSearch
              key={index}
              index={index}
              item={item}
              onClick={(a) => onClick(a)}
            />
          );
        })
      }
    </React.Fragment>
  );
}

export default OrderListSearch;
