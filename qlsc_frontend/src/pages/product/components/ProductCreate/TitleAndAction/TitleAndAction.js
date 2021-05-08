/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useHistory } from 'react-router';
import * as Icons from 'pages/product/commons/Icons';
import './styles.scss';
import { connect } from 'react-redux';
import pushstate from '../../../../../utils/pushstate';
import Action from './Action';

function TitleAndAction(props) {
  const history = useHistory();
  const onClick = () => {
    pushstate(history, `/staff/create`);
  };
  return (
    <div className="product-tilte-action">
      <div className="d-flex list-header">
        <div className="header-title">
          <div style={{ fontSize: '22px' }}>Danh sách sản phẩm</div>
          <Action setShowContent={(a) => props.setShowContent(a)}/>
        </div>
        {/* <div className="header-action">
          <button
            className="d-flex align-items-center justify-content-between btn btn-create"
            type="button"
            onClick={onClick}
          >
            <span
              className="d-flex align-items-center justify-content-center"
              style={{ marginLeft: 10 }}
            >
              <Icons.Create />
            </span>
            Tạo mới khách hàng
          </button>
        </div> */}
      </div>
    </div>
  );
}
TitleAndAction.defaultProps = {

};


export default React.memo(connect(null, null)(TitleAndAction));
