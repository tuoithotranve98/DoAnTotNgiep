import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
function InfoStaffFooter(props) {
  const { saveCustomer, cancel } = props;
  return (
    <div className="info-staff-footer">
     <div className="d-flex align-items-center justify-content-end">
          <div className="dlv-button-cancel" onClick={() => cancel()}>
              Hủy
          </div>
          <div className="d-flex align-items-center justify-content-between dlv-button-save">
            <div className="icon-button">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20C7.32891 20 4.81766 18.9598 2.92891 17.0711C1.04016 15.1823 0 12.6711 0 10C0 7.32891 1.0402 4.8177 2.92891 2.92891C4.81762 1.04012 7.32891 0 10 0C12.6711 0 15.1823 1.04016 17.0711 2.92891C18.9598 4.81766 20 7.32891 20 10C20 12.6711 18.9598 15.1823 17.0711 17.0711C15.1824 18.9599 12.6711 20 10 20ZM10 1.25C5.17523 1.25 1.25 5.17523 1.25 10C1.25 14.8248 5.17523 18.75 10 18.75C14.8248 18.75 18.75 14.8248 18.75 10C18.75 5.17523 14.8248 1.25 10 1.25Z" fill="#0084FF" />
                <path d="M10 9.375C9.13844 9.375 8.4375 8.67406 8.4375 7.8125C8.4375 6.95094 9.13844 6.25 10 6.25C10.8616 6.25 11.5625 6.95094 11.5625 7.8125C11.5625 8.15766 11.8423 8.4375 12.1875 8.4375C12.5327 8.4375 12.8125 8.15766 12.8125 7.8125C12.8125 6.47652 11.8759 5.35594 10.625 5.07086V4.375C10.625 4.02984 10.3452 3.75 10 3.75C9.6548 3.75 9.375 4.02984 9.375 4.375V5.07086C8.12414 5.35594 7.1875 6.47652 7.1875 7.8125C7.1875 9.36332 8.44918 10.625 10 10.625C10.8616 10.625 11.5625 11.3259 11.5625 12.1875C11.5625 13.0491 10.8616 13.75 10 13.75C9.13844 13.75 8.4375 13.0491 8.4375 12.1875C8.4375 11.8423 8.1577 11.5625 7.8125 11.5625C7.4673 11.5625 7.1875 11.8423 7.1875 12.1875C7.1875 13.5235 8.12414 14.6441 9.375 14.9291V15.625C9.375 15.9702 9.6548 16.25 10 16.25C10.3452 16.25 10.625 15.9702 10.625 15.625V14.9291C11.8759 14.6441 12.8125 13.5235 12.8125 12.1875C12.8125 10.6367 11.5508 9.375 10 9.375Z" fill="#0084FF" />
              </svg>

            </div>
            <div className="separate">
              <svg width="2" height="20" viewBox="0 0 2 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.228516" width="1" height="20" fill="#0088FF" />
              </svg>
            </div>
            <span onClick={() => saveCustomer()}>
              Lưu
            </span>
          </div>
        </div>
    </div>
  );
}
InfoStaffFooter.defaultProps = {

};
export default React.memo(connect(null, null)(InfoStaffFooter));
