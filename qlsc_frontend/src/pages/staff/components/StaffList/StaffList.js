import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import "./styles.scss";
import debounce from "utils/debounce";
import StaffListBody from "./StaffListBody/StaffListBody";
import StaffListHeader from "./StaffListHeader/StaffListHeader";
import { getListStaff } from "../../actions/staffAction";

const initialState = {
  page: 1,
  size: 10,
  nameField: "",
  order: "",
};

function StaffList(props) {
  const { onGetStaff } = props;
  const [filter, setFilter] = useState(initialState);
  const [search, setSearch] = useState("");
  useEffect(() => {
    onGetStaff();
  }, []);

  useEffect(() => {
    console.log('filter', filter);
    onGetStaff(search, filter);
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
    debounce((nextValue) => onGetStaff(nextValue, filter), 200),[]);

  return (
    <div className="staff-screen-wrapper">
      <StaffListHeader />
      <StaffListBody
        filter={filter}
        search={search}
        handleInputOnchange={handleInputOnchange}
        onChangeFilter={onChangeFilter}
      />
    </div>
  );
}
StaffList.defaultProps = {};

const mapDispatchToProps = (dispatch) => ({
  onGetStaff: (search, option) => dispatch(getListStaff(search, option)),
});

export default React.memo(connect(null, mapDispatchToProps)(StaffList));
