
import React, { forwardRef, useImperativeHandle } from 'react';
import "../../styles/list.scss";
import Item from "../Item/Item";

import Guard from 'components/Guard/Guard'
import { normalize, schema } from 'normalizr';
const customersTemp = new schema.Entity('items');

const List = forwardRef((props, ref) => {
  const { historyMainCard, fetching, isEmpty, selectedIds, onCheckBoxClick } = props;
  const { historyMainCards } = historyMainCard;

  useImperativeHandle(ref, () => ({
    onCheckAll() {
      const { onCheckBoxListClick, selectedIds } = props;
      if (historyMainCards.length !== selectedIds.length) {
        const normalized = normalize(historyMainCards, [customersTemp]);
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
      {historyMainCards.map((historyMainCard) => {
        return <Item
              key={historyMainCard.code}
              index={historyMainCard.code}
              historyMainCard={historyMainCard}
              checked={selectedIds.includes(historyMainCard.id)}
              onCheckBoxClick={onCheckBoxClick}
          />;
      })}
    </div>
  );
});
List.defaultProps = {
  historyMainCards: [],
};
export default List;
