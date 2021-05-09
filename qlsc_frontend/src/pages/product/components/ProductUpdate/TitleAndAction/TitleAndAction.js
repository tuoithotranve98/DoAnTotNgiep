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
  const { setShowContent } = props;
  const onClick = () => {
    pushstate(history, `/staff/create`);
  };
  return (
    <div className="product-tilte-action">
      <div className="d-flex list-header">
        <div className="header-title">
          <div style={{ fontSize: '22px' }}>Danh sách sản phẩm</div>
          <Action setShowContent={setShowContent}/>
        </div>
      </div>
    </div>
  );
}
TitleAndAction.defaultProps = {

};


export default React.memo(connect(null, null)(TitleAndAction));
