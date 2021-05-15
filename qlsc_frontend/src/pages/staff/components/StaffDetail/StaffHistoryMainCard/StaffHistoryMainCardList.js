import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import "./styles.scss";
import { useParams } from "react-router-dom";
import debounce from "utils/debounce";
import { getListStaffHistoryMainCard } from "../../../actions/staffHistoryMainCardAction";
import StaffHistoryMainCardListBody from "./StaffHistoryMainCardListBody/StaffHistoryMainCardListBody";

const initialState = {
  page: 1,
  size: 10,
  nameField: "",
  order: "",
};
function StaffHistoryMainCardList(props) {
  const { id } = useParams();
  const { onGetStaffHistoryMainCard, staff } = props;
  const [filter, setFilter] = useState(initialState);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (id) {
      filter.id = id;
      onGetStaffHistoryMainCard(search, filter);
      setFilter({ ...filter, id: id });
    }
  }, []);

  useEffect(() => {
    if (id) {
      onGetStaffHistoryMainCard(search, filter);
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
  };

  const debounceSearch = useCallback(
    debounce((nextValue) => onGetStaffHistoryMainCard(nextValue, filter), 200),
    []
  );

  return (
    <div className="history-main-card-screen-wrapper">
      <StaffHistoryMainCardListBody
        search={search}
        onGetStaffHistoryMainCard={onGetStaffHistoryMainCard}
        handleInputOnchange={handleInputOnchange}
        onChangeFilter={onChangeFilter}
      />
    </div>
  );
}
StaffHistoryMainCardList.defaultProps = {};

const mapDispatchToProps = (dispatch) => ({
  onGetStaffHistoryMainCard: (search, option) =>
    dispatch(getListStaffHistoryMainCard(search, option)),
});

export default React.memo(
  connect(null, mapDispatchToProps)(StaffHistoryMainCardList)
);
