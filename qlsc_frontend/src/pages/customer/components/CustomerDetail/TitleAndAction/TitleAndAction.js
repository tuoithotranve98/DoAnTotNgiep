/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';

function TitleAndAction(props) {
  return (
    <div className="customer-detail-tilte-action">
      <div className="d-flex list-header">
        <div className="header-title">
          <div style={{ fontSize: '22px', fontWeight: 600, marginLeft: 17 }}>{props.customer.name || '---'}</div>
        </div>
      </div>
    </div>
  );
}
TitleAndAction.defaultProps = {

};

export default React.memo(TitleAndAction);
