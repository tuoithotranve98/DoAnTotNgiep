
import React, { forwardRef, useImperativeHandle } from 'react';
import "../../styles/list.scss";
import Item from "../Item/Item";

import Guard from 'components/Guard/Guard'
import { normalize, schema } from 'normalizr';
const customersTemp = new schema.Entity('items');

const List = forwardRef((props, ref) => {
  const { staffHistoryMainCard, fetching, isEmpty, selectedIds, onCheckBoxClick } = props;
  const { staffHistoryMainCards } = staffHistoryMainCard;

  useImperativeHandle(ref, () => ({
    onCheckAll() {
      const { onCheckBoxListClick, selectedIds } = props;
      if (staffHistoryMainCards.length !== selectedIds.length) {
        const normalized = normalize(staffHistoryMainCards, [customersTemp]);
        const itemIds = normalized.result;
        onCheckBoxListClick(itemIds);
      } else {
        onCheckBoxListClick([]);
      }
    },
  }));

  if (isEmpty) return '';
  if (fetching) {
    return (
      <Guard />
    );
  }
  return (
    <div className="order-list-container">
      {staffHistoryMainCards.map((staffHistoryMainCard) => {
        return <Item
              key={staffHistoryMainCard.code}
              index={staffHistoryMainCard.code}
              staffHistoryMainCard={staffHistoryMainCard}
              checked={selectedIds.includes(staffHistoryMainCard.id)}
              onCheckBoxClick={onCheckBoxClick}
          />;
      })}
    </div>
  );
});
List.defaultProps = {
  staffHistoryMainCards: [],
};
export default List;
