import React from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import Action from './Action';

function TitleAndAction(props) {
  const { showContent } = props;
  return (
    <div className="product-tilte-action">
      <div className="d-flex list-header">
        <div className="header-title">
          <div style={{ fontSize: '22px' }}>Danh sách sản phẩm</div>
          <Action showContent={showContent}/>
        </div>
      </div>
    </div>
  );
}
TitleAndAction.defaultProps = {

};


export default React.memo(connect(null, null)(TitleAndAction));
