
import React, { forwardRef, useImperativeHandle, useEffect } from 'react';

import Guard from 'components/Guard/Guard';
import '../../styles/list.scss';
import { connect } from 'react-redux';
import Item from '../Item/Item';

const List = forwardRef((props, ref) => {

//   useImperativeHandle(ref, () => ({
//     getData(filterInfo) {
//       const tenant = JSON.parse(sessionStorage.getItem('tenant'));
//       const channelType = tenant.connections[0].channel_type;
//       const { fetchOrderCollation } = props;
//       const filterInfoDefault = {
//         channelType,
//         selectedStore: [],
//         showFilterByStore: false,
//         showFilter: false,
//         filterText: '',
//         startDate: '',
//         endDate: '',
//         selectedLocation: [],
//         selectedFilter: [],
//         status: '',
//       };
//       fetchOrderCollation(filterInfo || filterInfoDefault);
//     },
//     onCheckAll() {
//       const { onCheckBoxListClick, itemIds, selectedIds } = props;
//       if (itemIds.length !== selectedIds.length) {
//         onCheckBoxListClick(itemIds);
//       } else {
//         onCheckBoxListClick([]);
//       }
//     },

//   }));
//   const {
//     itemIds,
//     selectedIds,
//     onCheckBoxClick,
//     isEmpty,
//     fetching,
//   } = props;
//   if (isEmpty) return null;
//   if (fetching) {
//     return (
//       <Guard />
//     );
//   }
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
