import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';

function TitleAndAction() {
  return (
    <div className="tilte-action">
      <div className="d-flex list-header">
        <div className="header-title">
          <div style={{ fontSize: '22px' }}>Cập nhật nhân viên</div>
        </div>
      </div>
    </div>
  );
}
TitleAndAction.defaultProps = {

};


export default React.memo(connect(null, null)(TitleAndAction));
