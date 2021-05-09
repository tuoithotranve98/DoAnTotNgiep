/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useHistory } from 'react-router';
import * as Icons from 'pages/customer/commons/Icons';
import './styles.scss';
import { connect } from 'react-redux';
import pushstate from '../../../../../utils/pushstate';
import CustomerDetail from '../CustomerDetail';

function TitleAndAction(props) {
  const history = useHistory();
  const onClick = () => {
    pushstate(history, `/staff/create`);
  };
  return (
    <div className="tilte-action">
      <div className="d-flex list-header">
        <div className="header-title">
          <div style={{ fontSize: '22px' }}>{props.customer.name || '---'}</div>
        </div>
      </div>
    </div>
  );
}
TitleAndAction.defaultProps = {

};


export default React.memo(connect(null, null)(TitleAndAction));
