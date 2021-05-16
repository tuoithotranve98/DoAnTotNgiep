/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useHistory } from 'react-router';
import * as Icons from 'pages/product/commons/Icons';
import './styles.scss';
import { connect } from 'react-redux';
import Action from './Action';

function TitleAndAction(props) {
  const { setShowContent } = props;
  const history = useHistory();

  return (
    <div className="card-main-product-tilte-action">
      <div className="d-flex list-header">
        <div className="card-main-header-title">
          <Action setShowContent={setShowContent}/>
        </div>
      </div>
    </div>
  );
}
TitleAndAction.defaultProps = {

};


export default React.memo(connect(null, null)(TitleAndAction));
