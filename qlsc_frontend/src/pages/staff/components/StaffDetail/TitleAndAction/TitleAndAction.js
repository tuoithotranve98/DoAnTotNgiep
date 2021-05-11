import React from 'react';
import './styles.scss';

function TitleAndAction(props) {
  return (
    <div className="staff-detail-tilte-action">
      <div className="d-flex list-header">
        <div className="header-title">
          <div style={{ fontSize: '22px', fontWeight: 600, marginLeft: 17 }}>{props.staff.name || '---'}</div>
        </div>
      </div>
    </div>
  );
}
TitleAndAction.defaultProps = {

};

export default React.memo(TitleAndAction);
