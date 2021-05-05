
import React, { forwardRef, useImperativeHandle, useEffect } from 'react';

import Guard from 'components/Guard/Guard';
import '../../styles/list.scss';
import { connect } from 'react-redux';
import Item from '../Item/Item';

const List = forwardRef((props, ) => {
  const { customer } = props;
  console.log('customer', customer);
  return (
    <div className="order-list-container">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
    </div>
  );
});
export default List;
