import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Action from './Action';
import * as Icons from 'pages/maintenancecard/commons/Icons';

function TitleAndAction(props) {
  const { showContent } = props;
  return (
    <div className="product-tilte-action">
      <div className="d-flex list-header">
        <div className="header-title">
          <Action showContent={showContent}/>
        </div>
        {/* <div className="header-action">
          <button
            className="d-flex align-items-center justify-content-between btn btn-create"
            type="button"
          >
            <span
              className="d-flex align-items-center justify-content-center"
              style={{ marginLeft: 10 }}
            >
              <Icons.Create />
            </span>
            Xóa sản phẩm
          </button>
        </div> */}
      </div>
    </div>
  );
}
TitleAndAction.defaultProps = {

};


export default React.memo(connect(null, null)(TitleAndAction));
