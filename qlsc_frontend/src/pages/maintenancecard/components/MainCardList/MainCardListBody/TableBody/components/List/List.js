
import React, { forwardRef, useImperativeHandle } from 'react';
import "../../styles/list.scss";
import Item from "../Item/Item";

import Guard from 'components/Guard/Guard'
import { normalize, schema } from 'normalizr';
const mainCardsTemp = new schema.Entity('items');

const List = forwardRef((props, ref) => {
  const { mainCardList, filterInfo, fetching, isEmpty, selectedIds, onCheckBoxClick } = props;

  useImperativeHandle(ref, () => ({
    getData() {
      const { fetchMainCard } = props;
      const filterInfoDefault = {
        showFilter: false,
        filterText: '',
        statusWork: '',
        statusPayment: '',
        endDate: '',
        startDate: '',
      };
      fetchMainCard(filterInfoDefault);
    },
    onCheckAll() {
      const { onCheckBoxListClick, selectedIds } = props;
      if (mainCardList.length !== selectedIds.length) {
        const normalized = normalize(mainCardList, [mainCardsTemp]);
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
      {mainCardList.map((mainCard) => {
        return <Item
              key={mainCard.code}
              index={mainCard.code}
              mainCard={mainCard}
              checked={selectedIds.includes(mainCard.id)}
              onCheckBoxClick={onCheckBoxClick}
          />;
      })}
    </div>
  );
});
List.defaultProps = {
  mainCardList: [],
};
export default List;
