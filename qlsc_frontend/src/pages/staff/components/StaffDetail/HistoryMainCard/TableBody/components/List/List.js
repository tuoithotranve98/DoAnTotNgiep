
import React, { forwardRef } from 'react';
import '../../styles/list.scss';
import Item from '../Item/Item';

const List = forwardRef((props, ref) => {

  return (
    <div className="order-list-container">
      {/* {
          itemIds.map((orderId, index) => {
            return (
              <Item
                key={index}
                index={index}
                orderId={orderId}
                checked={selectedIds.includes(orderId)}
                onCheckBoxClick={onCheckBoxClick}
              />
            );
          })
        } */}
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
