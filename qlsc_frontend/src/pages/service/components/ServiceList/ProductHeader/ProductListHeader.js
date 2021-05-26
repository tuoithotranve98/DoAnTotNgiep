import React from 'react';
import { useHistory } from 'react-router';
import * as Icons from 'pages/maintenancecard/commons/Icons';
import './styles.scss';
import { connect } from 'react-redux';
import pushstate from '../../../../../utils/pushstate';

function ProductListHeader(props) {
  const history = useHistory();
  const onClick = () => {
    pushstate(history, `/service/create`);
  };
  return (
    <div className="tilte-action">
      <div className="d-flex list-header">
        <div className="header-title">
          <div style={{ fontSize: '22px' }}>Danh sách sản phẩm</div>
        </div>
        <div className="header-action">
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
            Tạo mới sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
}
ProductListHeader.defaultProps = {

};


export default React.memo(connect(null, null)(ProductListHeader));
