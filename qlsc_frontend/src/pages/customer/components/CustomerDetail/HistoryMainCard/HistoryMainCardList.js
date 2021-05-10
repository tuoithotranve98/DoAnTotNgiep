import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import "./styles.scss";
import debounce from "utils/debounce";
import HistoryMainCardListBody from "./HistoryMainCardListBody/HistoryMainCardListBody";
import { getListHistoryMainCard } from "../../../actions/historyMainCardAction";


const initialState = {
  page: 1,
  size: 10,
  nameField: "",
  order: "",
};
function HistoryMainCardList(props) {
  const { onGetHistoryMainCard, customer } = props;
  const [filter, setFilter] = useState(initialState);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if(customer) {
      filter.id = customer.id
      onGetHistoryMainCard(search, filter);
    }
  }, []);

  useEffect(() => {
    if(customer) {
      filter.id = customer.id
      onGetHistoryMainCard(search, filter);
    }
  }, [filter]);

  const handleInputOnchange = (e) => {
    e.persist();
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  const onChangeFilter = (type, value) => {
    setFilter({
      ...filter,
      [type]: value,
    });
  }

  const debounceSearch = useCallback(
    debounce((nextValue) => onGetHistoryMainCard(nextValue, filter), 200),
    []
  );

  return (
    <div className="history-main-card-screen-wrapper">
      <HistoryMainCardListBody
        search={search}
        onGetHistoryMainCard={onGetHistoryMainCard}
        handleInputOnchange={handleInputOnchange}
        onChangeFilter={onChangeFilter}
      />
    </div>
  );
}
HistoryMainCardList.defaultProps = {};

const mapDispatchToProps = (dispatch) => ({
  onGetHistoryMainCard: (search, option) => dispatch(getListHistoryMainCard(search, option)),
});

export default React.memo(connect(null, mapDispatchToProps)(HistoryMainCardList));
