import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Action from './Action';

function TitleAndAction(props) {
  const { setShowContent } = props;
  return (
    <div className="product-tilte-action">
      <div className="d-flex list-header">
        <div className="header-title">
          <Action setShowContent={setShowContent}/>
        </div>
      </div>
    </div>
  );
}
TitleAndAction.defaultProps = {

};


export default React.memo(connect(null, null)(TitleAndAction));
